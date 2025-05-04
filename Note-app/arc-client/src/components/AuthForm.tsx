// components/AuthForm.tsx
import { signIn } from "next-auth/react";
import { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Call NextAuth API for login
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      // Redirect or show success
      window.location.href = "/dashboard"; // Adjust as needed
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
