// components/LogoutButton.tsx
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="py-2 px-4 bg-red-600 text-white rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
