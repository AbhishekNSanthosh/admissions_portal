"use client"
import Sidebar from "@widgets/(student)/Sidebar";
import Topbar from "@widgets/(student)/Topbar";
import { getAuth } from "firebase/auth";
import { app } from "@lib/firebase"; // adjust if your firebase path is different
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-row items-center w-full h-screen">
      <Sidebar />
      <div className="pl-[16vw] flex flex-col items-center justify-start w-full h-screen">
        <div className="w-full">
          <Topbar user={user} />
        </div>
        <div className="pt-[13vh] pl-[1vw]">{children}</div>
      </div>
    </div>
  );
}
