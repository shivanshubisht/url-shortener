import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { link, customName } = req.body;
  console.log(link, customName);
  const existingLink = await prisma.link.findFirst({
    where: { url: link },
  });

  if (existingLink) {
    const existingCustomName = await prisma.link.findFirst({
      where: { customname: customName },
    });
    if (existingCustomName) {
      return res.status(200).json({ link: existingLink.customname });
    }
    if (customName) {
      const updateLink = await prisma.link.update({
        where: { id: existingLink.id },
        data: { customname: customName },
      });
      return res.status(200).json({ link: updateLink.customname });
    }

    return res.status(200).json({ link: existingLink.linkId });
  }

  const id = Math.random().toString(36).substring(2, 8);
  const addlink = await prisma.link.create({
    data: {
      url: link,
      linkId: id,
    },
  });
  return res.status(200).json({ link: addlink.linkId });
}
