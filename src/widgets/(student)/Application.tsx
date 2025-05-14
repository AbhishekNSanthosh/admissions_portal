"use client";

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@lib/firebase";
import Link from "next/link";
import { MdFileDownload } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Application() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        const q = query(
          collection(db, "admission_application"),
          where("email", "==", currentUser.email)
        );

        const snapshot = await getDocs(q);
        const applicationData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplications(applicationData);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleView = (id: string) => {
    router.push("/dashboard/applciations/" + id);
  };

  const handleDownload = (app: any) => {
    const blob = new Blob([JSON.stringify(app, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${app.generatedId || app.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateNew = () => {
    setShowModal(true);
  };

  const handleOptionSelect = (option: string) => {
    setShowModal(false);
    router.push(`/`);
  };

  console.log(showModal);

  if (loading) return <div className="p-4">Loading applications...</div>;

  return (
    <div className="flex flex-col relative p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Your Applications</h1>
        <div className="flex space-x-4">
          <Link href="/dashboard/drafts">
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              View Drafts
            </button>
          </Link>
          <button
            onClick={handleCreateNew}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            New Application
          </button>
        </div>
      </div>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {applications.map((app) => (
            <div
              // href={"/dashboard/application/" + app.id}
              key={app.id}
              className="p-4 bg-white border rounded shadow-sm"
            >
              <p>
                <strong>Name:</strong> {app.firstName} {app.lastName}
              </p>
              <p>
                <strong>Email:</strong> {app.email}
              </p>
              <p>
                <strong>Category:</strong> {app.category}
              </p>
              <p>
                <strong>Generated ID:</strong> {app.generatedId || "—"}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  className="bg-primary-600 flex items-center justify-center gap-2 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  onClick={() => handleView(app.id)}
                >
                  <FaRegEye className="text-[19px]" />
                  View
                </button>
                <button
                  className="bg-gray-700 text-white flex items-center justify-center gap-2 px-3 py-1 rounded hover:bg-gray-800 text-sm"
                  onClick={() => {
                    router.push("/dashboard/application/download/" + app?.id);
                  }}
                >
                  <MdFileDownload className="text-[19px]" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed w-[86vw] h-[89vh] backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[25vw]">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Select Admission Type
            </h2>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-3">
                <Link
                  href={"/dashboard/application/management/lateral-entry"}
                  className="px-4 py-3 bg-primary-600 text-white rounded hover:bg-blue-700"
                >
                  Management Quota - Lateral Entry
                </Link>
                <button
                  onClick={() =>
                    handleOptionSelect("Management Quota - Regular")
                  }
                  className="px-4 py-3 bg-primary-600 text-white rounded hover:bg-blue-700"
                >
                  Management Quota - Regular
                </button>
                <button
                  onClick={() =>
                    handleOptionSelect("Management Merit - Regular")
                  }
                  className="px-4 py-3 bg-primary-600 text-white rounded hover:bg-blue-700"
                >
                  Management Merit - Regular
                </button>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-[15px] text-sm text-red-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
