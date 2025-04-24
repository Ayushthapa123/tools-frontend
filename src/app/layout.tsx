import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { TopLevelWrapper } from 'src/features/TopLevelWrapper';

const inter = Inter({ subsets: ['latin'] });
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
      <body className={`${inter.className} bg-base-body`}>
        <TopLevelWrapper>{children}</TopLevelWrapper>
      </body>
    </html>
  );
}
