import './globals.css';

export const metadata = {
  title: 'URL Shortener Built with NextJS 13',
  description:
    'Url Shortener built with NextJS 13 App Directory, Typescript, Prisma and TailwindCSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
