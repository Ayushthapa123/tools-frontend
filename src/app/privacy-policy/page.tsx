import { Metadata } from 'next';
import { isHostelPilot, domainConfig } from 'src/config/domainConfig';
import HostelAdminPrivacy from './HostelAdminPrivacy';
import HostelPilotPrivacy from './HostelPilotPrivacy';
export const metadata: Metadata = {
  title: `Privacy Policy | ${isHostelPilot ? 'HostelPilot' : 'HostelAdmin'}`,
  description: `Understand how ${isHostelPilot ? 'HostelPilot' : 'HostelAdmin'} collects, uses, and safeguards your information.`,
  manifest: isHostelPilot ? '/manifest-hostelpilot.json' : '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: domainConfig.logo,
    title: `Privacy Policy | ${isHostelPilot ? 'HostelPilot' : 'HostelAdmin'}`,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-[1800px] p-8">
  {isHostelPilot ? <HostelPilotPrivacy /> : <HostelAdminPrivacy />}
    </div>
  );
}
