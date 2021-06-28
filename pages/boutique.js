import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('containers/HomePage'), { ssr: false });

export default function Home() {
  return (
    <HomePage />
  );
}
