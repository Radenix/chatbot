'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "../components/admin/Sidebar";
import axios from 'axios';

const AdminLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const getCookiesFromResponse = (response) => {
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      return setCookieHeader.join('; ');
    }
    return '';
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // İlk istekte çerezleri al
        const initialResponse = await axios.get('https://enabled-prompt-vervet.ngrok-free.app/api/v1/user/status', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const cookies = getCookiesFromResponse(initialResponse);
        
        if (cookies) {
          // İkinci istekte çerezi gönder
          const response = await axios.get('https://enabled-prompt-vervet.ngrok-free.app/api/v1/user/status', {
            headers: {
              'Content-Type': 'application/json',
              'Cookie': cookies, // Manuel olarak alınan çerezleri ekle
            },
          });

          if (response.data.logged_in) {
            setIsLoggedIn(true);
            setIsAdmin(response.data.admin);
          } else {
            router.push('/auth/login');
          }
        } else {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('User status check failed:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn) return null;

  if (!isAdmin) {
    router.push('/user/dashboard');
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
