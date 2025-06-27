'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Bot, BookOpen, Users, Stethoscope, LayoutDashboard, LogOut, Library } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';
import { auth } from '@/lib/firebase/client';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/ai-companion', label: 'AI Companion', icon: Bot },
  { href: '/dashboard/journal', label: 'Journal', icon: BookOpen },
  { href: '/dashboard/communities', label: 'Communities', icon: Users },
  { href: '/dashboard/therapists', label: 'Therapists', icon: Stethoscope },
  { href: '/dashboard/resources', label: 'Resources', icon: Library },
];

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      toast({
        title: 'Logout Failed',
        description: 'There was an error logging out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const userInitials = user?.displayName?.split(' ').map(n => n[0]).join('') || user?.email?.charAt(0).toUpperCase() || 'U';
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <Link href="/dashboard" className="flex items-center gap-2">
                <span className="font-headline text-2xl font-bold text-primary p-2 group-data-[collapsible=icon]:hidden">
                    Anvesna
                </span>
           </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    item.href === '/dashboard' 
                    ? pathname === item.href 
                    : pathname.startsWith(item.href)
                  }
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile">
                     <Link href="#">
                        <Avatar className="h-8 w-8">
                            {user?.photoURL ? (
                                <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />
                            ) : (
                                <AvatarImage src={`https://placehold.co/40x40.png?text=${userInitials}`} data-ai-hint="user avatar" />
                            )}
                            <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                        <span className="truncate group-data-[collapsible=icon]:hidden">{user?.displayName || user?.email || 'Student'}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                    <LogOut />
                    <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-start border-b bg-background px-4 md:hidden">
             <SidebarTrigger />
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
