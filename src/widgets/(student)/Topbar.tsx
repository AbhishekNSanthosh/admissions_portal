import React from "react";
import Image from "next/image";

export default function Topbar({ user }: { user: any }) {
  const isLoading = user === null;
  const displayName = user?.displayName || "User";
  const photoURL = user?.photoURL;

  return (
    <div className="w-[85vw] h-[12vh] bg-white fixed flex items-center justify-between px-8 border border-b-gray-200">
      {/* Left side - Welcome message */}
      <div className="text-lg font-semibold text-primary-600">
        {isLoading ? (
          <div className="animate-pulse w-[12rem] h-6 bg-gray-400 rounded-md" />
        ) : (
          `Welcome, ${displayName}👋`
        )}
      </div>

      {/* Right side - Profile picture */}
      <div>
        {isLoading ? (
          <div className="animate-pulse w-[45px] h-[45px] rounded-full bg-gray-400" />
        ) : photoURL ? (
          <div className="border-[2px] border-primary-600 rounded-full p-[2.3px] flex items-center justify-center">
            <Image
            src={photoURL}
            alt="Profile"
            width={45}
            draggable={false}
            height={45}
            className="rounded-full object-cover"
            onError={(e) => {
              // Optional: handle broken image URL
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          </div>
        ) : (
          <div className="w-[45px] h-[45px] rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
            {displayName.charAt(0)}
          </div>
        )}
      </div>
    </div>
  );
}
