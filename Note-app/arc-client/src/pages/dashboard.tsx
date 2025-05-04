// pages/dashboard.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if no session
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/login"); // Redirect to login if not authenticated
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
      <p className="mt-4">Logged in as {session.user?.email}</p>
    </div>
  );
};

export default DashboardPage;
