import dynamic from 'next/dynamic';

const Favorites = dynamic(() => import('containers/Boutique'), { ssr: false });

export default function Home() {
  return (
    <Favorites />
  );
}
