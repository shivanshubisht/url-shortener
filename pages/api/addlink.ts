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
  customName?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { link, customName } = req.body;
  const existingCustomLink = await prisma.link.findFirst({
    where: { customname: customName },
  });

  if (existingCustomLink && existingCustomLink.url !== link) {
    return res.status(200).json({
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
      return res.status(200).json({ customName: existingLink.customname });
    }

    if (customName) {
      const updatedLink = await prisma.link.update({
        where: { id: existingLink.id },
        data: { customname: customName },
      });
      return res.status(200).json({ customName: updatedLink.customname });
    }

    return res.status(200).json({ link: existingLink.linkId });
  }

  const id = Math.random().toString(36).substring(2, 8);
  const newLink = await prisma.link.create({
    data: {
      url: link,
      linkId: id,
      customname: customName,
    },
  });
  return newLink.customname
    ? res.status(200).json({ customName: newLink.customname })
    : res.status(200).json({ link: newLink.linkId });
}
