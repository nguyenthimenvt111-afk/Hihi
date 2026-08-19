import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect('/login');

  const user = session.user as any;

  if (user.status === 'pending') redirect('/pending');
  if (user.status === 'rejected' || user.status === 'banned') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '16rem' }}>
        <Topbar user={user} />
        <main className="flex-1 p-6 max-w-full">{children}</main>
      </div>
    </div>
  );
}
