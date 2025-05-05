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

    /**
     signIn params: 
      - provider: The name of the provider (in this case, "credentials").
      - options: An object containing the login credentials and other options.

      signIn returns a Promise that resolves to an object containing the following properties:
      - ok: A boolean indicating whether the sign-in was successful.
      - error: A string describing the error, if any (e.g., "Invalid credentials").
      - status: The HTTP status code of the response.
      - url: The URL to redirect to if redirect: true was used.
     */

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

/*What Happens When signIn is Called?

- The signIn function sends a request to the NextAuth API endpoint (/api/auth/callback/credentials) with the provided credentials (email and password).
- The authorize function in your CredentialsProvider (defined in [...nextauth].ts) is executed to validate the credentials.
- If the credentials are valid:
  The user is authenticated, and a session is created.
  The jwt and session callbacks are triggered to customize the token and session.
- If the credentials are invalid:
  The authorize function returns null, and the signIn function returns an error.


-- Response (res)
  The res object returned by signIn contains the following properties:
   -error: A string describing the error, if any (e.g., "Invalid credentials").
   -ok: A boolean indicating whether the sign-in was successful.
   -status: The HTTP status code of the response.
   -url: The URL to redirect to if redirect: true was used.

How It Works in the Code
 -The user submits the login form.
 -The signIn function is called with the user's email and password.
 -If the login is successful (res?.error is null):
   -The user is redirected to the /dashboard page.
 -If the login fails (res?.error is not null):
   -An error message ("Invalid email or password.") is displayed.


Example Flow
 -User enters:
   Email: test@example.com
   Password: Eram1234$
 -signIn sends these credentials to the backend.
 -The authorize function in [...nextauth].ts validates the credentials.
 -If valid:
    signIn returns { ok: true, error: null, status: 200 }.
    The user is redirected to /dashboard.
 -If invalid:
    signIn returns { ok: false, error: "Invalid credentials", status: 401 }.
    The error message is displayed.

*/
