import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page after a brief delay
    const redirectTimeout = setTimeout(() => {
      router.push('/ielts-admin/login');
    }, 2000); // You can adjust the delay as needed

    // Clear the timeout if the component is unmounted before the redirect
    return () => clearTimeout(redirectTimeout);
  }, [router]); // Pass router as a dependency to silence the eslint warning

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Logging out...</p>
    </div>
  );
}
