import { Metadata } from 'next';
import { domainConfig } from 'src/config/domainConfig';
import LoginComponent from './Login';

export const metadata: Metadata = {
  title: 'Toolsland.ai Login',
      description: "Sign in to your Toolsland.ai account",
  manifest:  '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: domainConfig.coverImage,
    title: 'Toolsland.ai Login',
  },
};

const SignIn = () => {
  return <LoginComponent />;
};

export default SignIn;
