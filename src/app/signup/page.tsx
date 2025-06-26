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

async function signupAction(formData: FormData) {
  "use server";

  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const email = formData.get("email");
  const password = formData.get("password");

  // This is a mock signup.
  // In a real app, you'd create a new user in the database.
  if (firstName && lastName && email && password) {
    console.log("New user signed up:", { firstName, lastName, email });
    redirect("/dashboard");
  }
}

async function googleSignupAction() {
  "use server";

  // This is a mock Google signup.
  console.log("Signing up with Google...");
  redirect("/dashboard");
}

export default function SignupPage() {
  return (
    <div className="container flex min-h-[calc(100vh-12rem)] items-center justify-center py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" name="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" name="last-name" placeholder="Robinson" required />
                </div>
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" formAction={signupAction}>
                Create an account
              </Button>
              <Button variant="outline" className="w-full" type="submit" formAction={googleSignupAction}>
                Sign up with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
