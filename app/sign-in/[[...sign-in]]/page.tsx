import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/editor"
        forceRedirectUrl="/editor"
      />
    </AuthLayout>
  );
}
