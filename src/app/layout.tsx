import type { Metadata } from 'next';
import { Sora, Teko } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { TopLevelWrapper } from 'src/features/TopLevelWrapper';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sora',
});

const teko = Teko({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-teko',
});

export const metadata: Metadata = {
  title: 'Homestay Management Software',
  description:
    'homestay offers a comprehensive platform that allows you to seamlessly upload and manage all the details of your hostel online. By leveraging our user-friendly interface, you can ensure that potential guests can easily find your hostel, check availability, and reach out to you directly',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/logo512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo512.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo512.png" />

        <link rel="manifest" href="/manifest.json" />

        <link rel="mask-icon" href="/home-stay-logo.png" color="#3B5D50" />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="nepal-theme" content="#3B5D50" />

        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <body className={`${sora.variable} ${teko.variable} font-sans bg-base-body`}>
        <TopLevelWrapper>{children}</TopLevelWrapper>
      </body>
    </html>
  );
}
