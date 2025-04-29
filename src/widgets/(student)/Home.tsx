"use client"
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '@lib/firebase'; // adjust path to your firebase config
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [applicationFound, setApplicationFound] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    const checkApplication = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, 'admissionApplications'),
        where('email', '==', user.email)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setApplicationFound(true);
      }
      setLoading(false);
    };

    checkApplication();
  }, []);

  const handleCreateNew = () => {
    setShowModal(true);
  };

  const handleOptionSelect = (option: string) => {
    setShowModal(false);
    router.push(`/`);
  };

  if (loading) {
    return <div className='w-full h-full items-center justify-center flex'>Loading...</div>;
  }

  if (!applicationFound) {
    return (
      <div className="flex flex-col items-center justify-center h-full relative">
        <p className="mb-4 text-lg">You haven't submitted any application.</p>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-blue-700"
        >
          Create New
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed w-[85vw] h-[88vh] backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[25vw]">
              <h2 className="text-lg font-semibold mb-4 text-center">Select Admission Type</h2>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-3">
                <Link
                  href={'/dashboard/application/management/lateral-entry'}
                  className="px-4 py-3 bg-primary-600 text-white rounded hover:bg-blue-700"
                >
                  Management Quota - Lateral Entry
                </Link>
                <button
                  onClick={() => handleOptionSelect('Management Quota - Regular')}
                  className="px-4 py-3 bg-primary-600 text-white rounded hover:bg-blue-700"
                >
                  Management Quota - Regular
                </button>
                <button
                  onClick={() => handleOptionSelect('Management Merit - Regular')}
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

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-lg">You have already submitted an application!</p>
    </div>
  );
}
