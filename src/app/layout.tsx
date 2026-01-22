import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Memeterest',
  description: 'Share and discover memes',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex min-h-screen flex-col md:flex-row">
            {/* Navigation - Only visible if logged in */}
            {session?.user && (
              <>
                <Sidebar user={session.user} />
                <MobileNav user={session.user} />
              </>
            )}

            {/* Main Content Area */}
            <main className={`flex-1 ${session?.user ? 'md:ml-64 mb-16 md:mb-0' : ''} transition-all duration-300`}>
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
