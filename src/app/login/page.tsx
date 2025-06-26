import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";

async function loginAction(formData: FormData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  // This is a mock authentication.
  // In a real app, you'd validate against a database.
  if (email && password) {
    redirect("/dashboard");
  }
}

async function googleLoginAction() {
  "use server";

  // This is a mock Google authentication.
  console.log("Mocking Google login...");
  redirect("/dashboard");
}

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-12rem)] items-center justify-center py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" formAction={loginAction} className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full" type="submit" formAction={googleLoginAction}>
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
