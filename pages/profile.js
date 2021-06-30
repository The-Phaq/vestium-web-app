import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('containers/Profile'), { ssr: false });

export default function Home() {
    return <Profile />;
}
