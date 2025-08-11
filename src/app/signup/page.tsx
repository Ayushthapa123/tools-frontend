import { isHostelPilot, domainConfig } from 'src/config/domainConfig';
import SignupComponent from './SignUp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: isHostelPilot ? 'HostelPilot Signup' : 'Hosteladmin Signup',
  description: isHostelPilot
    ? 'Sign up to your HostelPilot account'
    : 'Sign up to your Hosteladmin account',
  manifest: isHostelPilot ? '/manifest-hostelpilot.json' : '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: domainConfig.logo,
    title: isHostelPilot ? 'Hostelpilot Signup' : 'Hosteladmin Signup',
  },
};

export default function Home() {
  return (
    <div>
      <SignUp />
    </div>
  );
}

function SignUp() {
  return <SignupComponent />;
}
