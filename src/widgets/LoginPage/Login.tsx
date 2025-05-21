"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@lib/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Sign in failed. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        router.push("/dashboard");
      }
      setIsCheckingAuth(false);
    });
    
    return () => unsubscribe();
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

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
          
          <button
            disabled={isSigningIn}
            className={`flex cursor-pointer w-full md:w-auto flex-row items-center justify-center border-[1px] bg-white gap-3 border-gray-400 px-[3rem] py-3 rounded-md ${
              isSigningIn ? "opacity-70" : ""
            }`}
            onClick={handleGoogleSignIn}
          >
            {isSigningIn ? (
              "Please wait..."
            ) : (
              <>
                <Image
                  src={"/google.png"}
                  width={1000}
                  height={1000}
                  className="w-[2rem]"
                  alt="Google logo"
                />
                <span>Continue with Google</span>
              </>
            )}
          </button>
          
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