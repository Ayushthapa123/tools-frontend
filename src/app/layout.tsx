// import { Sora, Teko } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { TopLevelWrapper } from 'src/features/TopLevelWrapper';
import { isHostelPilot } from 'src/config/domainConfig';
import 'tinymce/skins/content/default/content.min.css';
import 'tinymce/skins/ui/oxide/skin.min.css';


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

        <link rel="manifest" href={isHostelPilot ? "/manifest-hostelpilot.json" : "/manifest.json"} />
        <meta name="theme-color" content="#000" />
        <link rel="mask-icon" href="/logo512.png" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <body className={`bg-base-body font-sora`}>
        <TopLevelWrapper>{children}</TopLevelWrapper>
      </body>
    </html>
  );
}
