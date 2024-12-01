'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "../components/admin/Sidebar";
import axios from 'axios';

const AdminLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Send the request with `withCredentials` to include cookies automatically
        const response = await axios.get('https://enabled-prompt-vervet.ngrok-free.app/api/v1/user/status', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Ensures cookies are sent with the request
        });

        if (response.data.logged_in) {
          setIsAdmin(response.data.admin);
        } else {
          router.push('/auth/login'); // Redirect to login if not logged in
        }
      } catch (error) {
        console.error('User status check failed:', error);
        router.push('/auth/login'); // Redirect to login if there's an error
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) {
    // router.push('/user/dashboard'); // Redirect non-admin users to their dashboard
    return null;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
