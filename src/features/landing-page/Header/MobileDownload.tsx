import Image from "next/image";
import Link from "next/link";

export default function MobileDownload() {
  
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.hosteladmin.twa&pcampaignid=web_share";
  
  return (
    <div className='flex flex-col items-center justify-center bg-primary py-12 pb-6 mt-8 md:px-10 px-5 md:py-24'>
      <h1 className='text-white text-center md:text-3xl lg:text-5xl text-xl font-bold tracking-wide'>Download our Hostel Admin <br/> Mobile App</h1>
      <p className=" text-center lg:text-xl md:text-base text-sm font-bold text-gray-300 tracking-wider">You can now manage your hostel from the palm of your hand</p>
      <div className='flex flex-row items-center justify-center'>
        <Link
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-200 hover:scale-105 cursor-pointer"
          aria-label="Download Hostel Admin app from Google Play Store"
        >
          <Image src='/images/google-play.png' alt='Google Play' width={200} height={200} />
        </Link>
      </div>
    </div>
  );
} 