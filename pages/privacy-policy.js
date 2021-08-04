import dynamic from 'next/dynamic';

const PrivacyPolicy = dynamic(() => import('containers/PrivacyPolicy'), { ssr: false });

export default function Home() {
  return (
    <PrivacyPolicy />
  );
}
