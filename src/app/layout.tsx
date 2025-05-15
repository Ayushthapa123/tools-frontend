import type { Metadata } from 'next';
// import { Sora, Teko } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { TopLevelWrapper } from 'src/features/TopLevelWrapper';
import PWARegister from 'src/components/PWARegister';
import { CheckSession } from 'src/features/CheckSession';

// const sora = Sora({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700'],
//   variable: '--font-sora',
// });

// const teko = Teko({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700'],
//   variable: '--font-teko',
// });

// export const metadata: Metadata = {
//   title: 'Homestay Management Software',
//   description:
//     'homestay offers a comprehensive platform that allows you to seamlessly upload and manage all the details of your homestay online. By leveraging our user-friendly interface, you can ensure that potential guests can easily find your homestay, check availability, and reach out to you directly',
//   manifest: '/manifest.json',
//   icons: {
//     icon: '/logo512.png',
//     apple: '/logo512.png',
//   },
//   themeColor: '#3B5D50',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/logo512.png" />

        <link rel="icon" href="/logo512.png" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000" />
        <link rel="mask-icon" href="/logo512.png" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <body className={`font-sora bg-base-body`}>

        <TopLevelWrapper>{children}</TopLevelWrapper>
      </body>
    </html>
  );
}
