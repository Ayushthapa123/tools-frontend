// import { Sora, Teko } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { TopLevelWrapper } from 'src/features/TopLevelWrapper';
import { domainConfig } from 'src/config/domainConfig';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  other: {
    "google-adsense-account": "ca-pub-9683433840347502",
    "impact-site-verification": "a3169950-661d-48fc-a4d5-94c5eb26c03f",
  },

};


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
           {/* Google AdSense script (must be outside <head>) */}
      
        <TopLevelWrapper>{children}</TopLevelWrapper>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9683433840347502"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
            <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BCW602NW1Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Important: disable automatic page_view for SPA apps
            gtag('config', 'G-BCW602NW1Y', { send_page_view: false });
          `}
        </Script>
      </body>
    </html>
  );
}
