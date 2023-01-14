import { redirect } from 'next/navigation';
import Redirect from '../../components/Redirect';
import { prisma } from '../../server/db/client';

interface ParamsType {
  params: { linkId: string };
  searchParams: { [key: string]: string };
}

function asyncComponent<T, R>(
  fn: (arg: T) => Promise<R | null>
): (arg: T) => R {
  return fn as (arg: T) => R;
}

const Link = asyncComponent<ParamsType, JSX.Element>(async ({ params }) => {
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
      return url ? <Redirect url={url.url} /> : null;
    }
    // redirect(url.url);
  }
  return <div>URL not found</div>;
});

export default Link;
