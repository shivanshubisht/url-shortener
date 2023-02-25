import { redirect } from 'next/navigation';
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
    redirect(url.url);
  }
  return <div>URL not found</div>;
};

export default Link;
