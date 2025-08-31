import { Metadata } from 'next';

import { ToolsLandTandC } from './ToolsLandTandC';
import { domainConfig } from 'src/config/domainConfig';
export const metadata: Metadata = {
  title: `Terms and Conditions | Toolsland.ai`,
  description:
    `Read the terms and conditions for using Toolsland.ai. Understand your rights and responsibilities while using our platform.`,
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: domainConfig.logo,
    title: `Terms and Conditions | Toolsland.ai`,
  },
};

export default function TermsAndConditions() {
  return (
   <div>
    <ToolsLandTandC />
   </div>
  );
}
