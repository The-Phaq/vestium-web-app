import dynamic from 'next/dynamic';

const Boutique = dynamic(() => import('containers/Boutique'), { ssr: false });

export default function Home() {
  return (
    <Boutique />
  );
}
