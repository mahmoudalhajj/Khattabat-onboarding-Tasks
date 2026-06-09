"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/AuthStore";

const HomePage = observer(() => {
  const router = useRouter();

  useEffect(() => {
    if (!authStore.isLoggedIn()) {
      router.replace("/auth");
    }
  }, [router]);

  return <div>Home Page</div>;
});

export default HomePage;