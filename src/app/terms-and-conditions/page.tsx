import { Metadata } from 'next';

import { HostelAdminTandC } from './HostelAdminTandC';
import { HostelPilotTandC } from './HostelPilotTandC';
import { isHostelAdmin } from 'src/config/domainConfig';
export const metadata: Metadata = {
  title: `Terms and Conditions | ${isHostelAdmin ? 'HostelAdmin' : 'HostelPilot'}`,
  description:
    `Read the terms and conditions for using ${isHostelAdmin ? 'HostelAdmin' : 'HostelPilot'}. Understand your rights and responsibilities while using our platform.`,
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logo512.png',
    title: `Terms and Conditions | ${isHostelAdmin ? 'HostelAdmin' : 'HostelPilot'}`,
  },
};

export default function TermsAndConditions() {
  return (
   <div>
    {isHostelAdmin ? <HostelAdminTandC /> : <HostelPilotTandC />}
   </div>
  );
}
