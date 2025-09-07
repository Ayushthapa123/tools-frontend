import { Metadata } from 'next';
import { domainConfig } from 'src/config/domainConfig';
import SummitAiTool from './SummitAiTool';

export const metadata: Metadata = {
  title: 'Submit AI Tool for Free | Toolsland.ai',
  description:
    'Submit your AI tool for free on Toolsland.ai — the platform to showcase, promote, and reach AI enthusiasts, developers, and businesses actively searching for the latest AI tools.',
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: domainConfig.coverImage,
    title: 'Submit AI Tool for Free | Toolsland.ai',
    description:
      'List your AI tool for free on Toolsland.ai and connect with a growing audience of AI users, developers, and businesses worldwide.',
  },
};


const SubmitAI = () => {
  return <SummitAiTool />;
};

export default SubmitAI;
