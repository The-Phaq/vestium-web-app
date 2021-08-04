import dynamic from 'next/dynamic';

const TermsConditions = dynamic(() => import('containers/TermsConditions'), { ssr: false });

export default function Home() {
  return (
    <TermsConditions />
  );
}
