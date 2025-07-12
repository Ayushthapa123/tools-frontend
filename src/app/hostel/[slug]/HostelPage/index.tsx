
"use client"
import Footer from 'src/features/Footer';
import {
  Hostel,
} from 'src/gql/graphql';
import MainContent from './MainContent';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import LoadingSpinner from 'src/components/Loading';
import { notFound } from 'next/navigation';
export function HostelPage({
  slug,
  checkInDat,
  checkOutDat,
  hostelData,
}: {
  slug: string;
  checkInDat: string;
  checkOutDat: string;
  hostelData: Hostel;
}) {
  const checkInDate = checkInDat ?? new Date().toISOString().split('T')[0];
  const checkOutDate = checkOutDat ?? new Date(Date.now() + 86400000).toISOString().split('T')[0];


  if (!hostelData) {
    return notFound()
  }
  return (
    <>
      <CommonNav />
      <div className="w-full ">
        <div>
          <div>
            {hostelData && (
              <MainContent
                hostel={hostelData as Hostel}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
