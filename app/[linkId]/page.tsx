import { redirect } from 'next/navigation';
import Redirect from '../../components/Redirect';
import { prisma } from '../../server/db/client';

interface ParamsType {
  params: { linkId: string };
  searchParams: { [key: string]: string };
}

// interface GenericType<T extends ParamsType> {
//   (arg: T): Promise<JSX.Element | null>;
// }

type GenericType = <T extends ParamsType>(
  arg: T
) => Promise<JSX.Element | null>;

// const Link: GenericType<ParamsType> = async ({ params }) => {
const Link: GenericType = async ({ params }) => {
  const url = await prisma.link.findFirst({
    where: {
      OR: [
        {
          customname: params.linkId,
        },
        {
          linkId: params.linkId,
        },
      ],
    },
  });
  if (url) {
    {
      console.log(url.url);
      return url ? <Redirect url={url.url} /> : null;
    }
    // Producing CORS error currently because of changed next/navigation in nextjs 13, redirect working as fetch first instead of server redirecting.
    // redirect(url.url);
  }
  return <div>URL not found</div>;
};

export default Link;
