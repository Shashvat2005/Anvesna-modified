'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const isDashboard = pathname.startsWith('/dashboard');
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    if (loading) return;

    // If user is logged in, redirect from auth pages to dashboard
    if (user && isAuthPage) {
      router.push('/dashboard');
    }

    // If user is not logged in, redirect from dashboard pages to login
    if (!user && isDashboard) {
      router.push('/login');
    }
  }, [loading, user, isDashboard, isAuthPage, router, pathname]);

  if (loading && (isDashboard || isAuthPage)) {
    return (
        <div className="flex h-screen w-full">
            <div className="hidden md:flex flex-col gap-4 p-4 border-r bg-muted/40 w-64">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-full mt-4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="mt-auto h-10 w-full" />
            </div>
            <div className="flex-1 p-8">
                <Skeleton className="h-12 w-1/2 mb-8" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    );
  }

  if (isDashboard && user) {
    return <SidebarLayout>{children}</SidebarLayout>;
  }

  return (
    <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
    </div>
  );
}
