import dynamic from 'next/dynamic';

const Favorites = dynamic(() => import('containers/Favorites'), { ssr: false });

export default function Home() {
  return (
    <Favorites />
  );
}
