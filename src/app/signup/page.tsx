import { domainConfig } from 'src/config/domainConfig';
import SignupComponent from './SignUp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toolsland.ai Signup',
  description: 'Sign up to your Toolsland.ai account',
  manifest:  '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: domainConfig.coverImage,
    title: 'Toolsland.ai Signup',
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
