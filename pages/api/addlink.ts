import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

type Data = {
  link?: string | null;
  error?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { link, customName } = req.body;
  // if custom name is already taken
  const existingCustomLink = await prisma.link.findFirst({
    where: { customname: customName },
  });

  if (existingCustomLink) {
    //@ts-ignore
    return res.status(400).json({
      error: `Custom name already exists for another URL ${existingCustomLink.url}. Either change your custom name or change the custom name for the existing custom URL.`,
    });
  }

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
      customname: customName,
    },
  });
  return addlink.customname
    ? res.status(200).json({ link: addlink.customname })
    : res.status(200).json({ link: addlink.linkId });
}
