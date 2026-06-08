import { AuthCallback } from "@/components/auth/auth-callback";

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; error?: string }>;
}) {
  const params = await searchParams;
  return <AuthCallback status={params.status} error={params.error} />;
}
