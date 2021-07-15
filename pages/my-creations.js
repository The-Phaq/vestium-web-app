import dynamic from 'next/dynamic';

const MyCreations = dynamic(() => import('containers/MyCreations'), { ssr: false });

export default function Home() {
  return (
    <MyCreations />
  );
}
