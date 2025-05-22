"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "@lib/firebase";
import { useRouter } from "next/navigation";
import easyToast from "@components/CustomToast";

export default function Login() {
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isSendingReset, setIsSendingReset] = useState(false);

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

  const handleEmailPasswordSignIn = async () => {
    setErrorMsg(null);
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      easyToast({
        message: "Please enter both email and password.",
        type: "error",
      });
      return;
    }
    try {
      setIsSigningIn(true);
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      easyToast({
        message: "Login successful",
        desc: "Redirecting to dashboard",
        type: "success",
      });
      setUser(userCredential.user);
      router.push("/dashboard/home");
    } catch (error: any) {
      console.error("Email/Password sign-in error:", error);
      setErrorMsg(
        error.message || "Failed to sign in. Please check your credentials."
      );
      easyToast({
        message: "Failed to sign in",
        desc: "Please check your credentials.",
        type: "error",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      easyToast({
        message: "Email required",
        desc: "Please enter your email to reset your password.",
        type: "error",
      });
      return;
    }

    try {
      setIsSendingReset(true);
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, resetEmail);
      easyToast({
        message: "Reset email sent",
        desc: "Check your inbox or spam folder.",
        type: "success",
      });
      setShowResetModal(false);
      setResetEmail("");
    } catch (error: any) {
      easyToast({
        message: "Error",
        desc: error.message || "Failed to send reset email.",
        type: "error",
      });
    } finally {
      setIsSendingReset(false);
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
          alt="Logo"
        />
      </div>
      <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center w-full">
        <div className="flex-[1.5] w-full flex items-center justify-center">
          <Image
            src={"/login.svg"}
            width={1000}
            height={1000}
            className="md:w-[28rem] w-[15rem]"
            alt="Login illustration"
          />
        </div>
        <div className="flex-1 w-full flex flex-col items-start justify-center gap-4 px-[5vw] md:px-0">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">Welcome!</span>
            <span className="text-gray-700">
              The smarter way to manage your admissions.
            </span>
          </div>
          <div className="w-full max-w-sm flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
              disabled={isSigningIn}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
              disabled={isSigningIn}
            />
            {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}
            <button
              disabled={isSigningIn}
              onClick={handleEmailPasswordSignIn}
              className={`bg-primary-500 text-white rounded-md py-3 text-sm hover:bg-primary-600 ${
                isSigningIn ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isSigningIn ? "Please wait..." : "Login"}
            </button>
            <button
              onClick={() => setShowResetModal(true)}
              className="text-sm text-blue-600 mt-1 hover:underline text-start"
              disabled={isSigningIn}
            >
              Forgot password?
            </button>
          </div>

          <div className="flex items-center gap-2 w-full max-w-sm">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="w-full max-w-sm flex flex-col gap-3">
            <button
              disabled={isSigningIn}
              className={`flex cursor-pointer w-full flex-row items-center justify-center border-[1px] bg-white gap-3 border-gray-400 px-[3rem] py-3 rounded-md ${
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
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-gray-700">
              Seamless and secure sign-in with your Google account.
            </span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-opacity-50">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-lg relative">
            <h2 className="text-lg font-semibold mb-2">Reset Password</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email to receive a reset link.
            </p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Email address"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="text-gray-600 text-sm"
                onClick={() => {
                  setShowResetModal(false);
                  setResetEmail("");
                }}
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordReset}
                className="bg-primary-500 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-600"
                disabled={isSendingReset}
              >
                {isSendingReset ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
