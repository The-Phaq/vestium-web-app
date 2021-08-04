import dynamic from 'next/dynamic';

const CookiePolicy = dynamic(() => import('containers/CookiePolicy'), { ssr: false });

export default function Home() {
  return (
    <CookiePolicy />
  );
}
