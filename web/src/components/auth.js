"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export function useRedirectIfLoggedIn(){
   const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };
  const router = useRouter();

  useEffect(() => {
    console.log(isLoggedIn)
    if (isLoggedIn()) {
      router.push("/dashboard");
    }
  }, []);
};

