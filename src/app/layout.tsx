import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AppShell } from '@/components/layout/app-shell';
import { AuthProvider } from '@/context/auth-context';

export const metadata: Metadata = {
  title: 'Anvesna - Your Journey to Mental Wellness',
  description:
    'Anvesna is an AI-powered mental wellness platform for Indian university students, providing a Circle of Care with an AI companion, anonymous peer communities, and professional therapy access.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
