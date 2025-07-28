"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/auth/check-auth', {
          withCredentials: true,
        });
      } catch {
        router.replace('/login?expired=1');
      }
    };

    checkAuth();
  }, [router]);
}
