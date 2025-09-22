// import { Sora, Teko } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { TopLevelWrapper } from 'src/features/TopLevelWrapper';
import { domainConfig } from 'src/config/domainConfig';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href={domainConfig.logo} />

        <link rel="icon" href={domainConfig.logo} />

        <link rel="manifest" href={"/manifest.json"} />
        <meta name="theme-color" content="#000" />
        <link rel="mask-icon" href={domainConfig.logo} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"  />
        <meta name='impact-site-verification' content='a3169950-661d-48fc-a4d5-94c5eb26c03f' />
        <meta name="google-adsense-account" content="ca-pub-9683433840347502" />
      </Head>
      <body className={`bg-base-body font-sora`}>
        <TopLevelWrapper>{children}</TopLevelWrapper>
      </body>
    </html>
  );
}
