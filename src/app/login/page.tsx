import { Metadata } from 'next';
import { isHostelPilot } from 'src/config/domainConfig';
import LoginComponent from './Login';

export const metadata: Metadata = {
  title: isHostelPilot ? 'HostelPilot Login' : 'Hosteladmin Login',
  description: isHostelPilot
    ? 'Sign in to your HostelPilot account'
    : 'Sign in to your Hosteladmin account',
  manifest: isHostelPilot ? '/manifest-hostelpilot.json' : '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logo512.png',
    title: isHostelPilot ? 'Hostelpilot Login' : 'Hosteladmin Login',
  },
};

const SignIn = () => {
  return <LoginComponent />;
};

export default SignIn;
