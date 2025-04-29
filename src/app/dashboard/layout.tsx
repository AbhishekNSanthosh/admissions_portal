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
      <div className="pl-[15vw] flex flex-col items-center justify-start w-full h-screen">
        <div className="w-full">
          <Topbar user={user} />
        </div>
        <div className="mt-[14vh] w-[83.5vw] h-full pl-[1vw] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
