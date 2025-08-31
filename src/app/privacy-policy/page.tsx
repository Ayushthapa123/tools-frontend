import { Metadata } from 'next';
import { domainConfig } from 'src/config/domainConfig';
import ToolsLandPrivacy from './ToolsLandPrivacy';
export const metadata: Metadata = {
  title: `Privacy Policy | Toolsland.ai`,
  description: `Understand how Toolsland.ai collects, uses, and safeguards your information.`,
  manifest:  '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: domainConfig.logo,
    title: `Privacy Policy | Toolsland.ai`,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-[1800px] p-8">
  <ToolsLandPrivacy />
    </div>
  );
}
