import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="font-headline text-3xl font-bold text-primary">
              Anvesna
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Your journey to mental wellness starts here. Safe, private, and accessible support for Indian students.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-headline font-semibold">Company</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">Partners</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link>
              </nav>
            </div>
            <div>
              <p className="font-headline font-semibold">Platform</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="/features" className="text-muted-foreground hover:text-primary">How It Works</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">AI Companion</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">Peer Support</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">Therapy</Link>
              </nav>
            </div>
            <div>
              <p className="font-headline font-semibold">Resources</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="/resources" className="text-muted-foreground hover:text-primary">Blog</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">Help Center</Link>
                <Link href="/resources" className="text-muted-foreground hover:text-primary">Crisis Support</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link>
              </nav>
            </div>
             <div>
              <p className="font-headline font-semibold">Legal</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">Cookie Policy</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">HIPAA Notice</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Anvesna Wellness. All rights reserved.</p>
          <p className="mt-2">If you are in a crisis, please call 911 or go to your nearest emergency room.</p>
        </div>
      </div>
    </footer>
  );
}
