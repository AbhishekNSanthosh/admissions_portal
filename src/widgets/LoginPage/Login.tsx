"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@lib/firebase"; // adjust the path based on your project structure
import { useRouter } from "next/navigation";

export default function Login() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      router.push("/dashboard");
      setUser(result?.user);
      // Redirect or do something after login
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
useEffect(() => {
  const auth = getAuth(app);
  const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      router.push("/dashboard"); // ✅ Redirect only if logged in
    }
  });
  return () => unsubscribe();
}, []);


  // useEffect(() => {
  //   if (user) {
  //     router.push('/dashboard')
  //   }
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="px-[5vw] py-[3rem]">
        <Image
          src={"/Carmelpoly.png"}
          width={1000}
          height={1000}
          className="w-[28rem]"
          alt=""
        />
      </div>
      <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center w-full">
        <div className="flex-[1.5] w-full flex items-center justify-center">
          <Image
            src={"/login.svg"}
            width={1000}
            height={1000}
            className="md:w-[28rem] w-[15rem]"
            alt=""
          />
        </div>
        <div className="flex-1 w-full flex flex-col items-start justify-center gap-4 px-[5vw] md:px-0">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">Welcome!</span>
            <span className="text-gray-700">
              The smarter way to manage your admissions.
            </span>
          </div>
          {/* Google Sign-In Button */}
          <div
            className="flex cursor-pointer w-full md:w-auto flex-row items-center border-[1px] bg-white gap-3 border-gray-400 px-[3rem] py-3 rounded-md"
            onClick={handleGoogleSignIn}
          >
            <Image
              src={"/google.png"}
              width={1000}
              height={1000}
              className="w-[2rem]"
              alt=""
            />
            <span className="">Continue with Google</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">
              Seamless and secure sign-in with your Google account.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
