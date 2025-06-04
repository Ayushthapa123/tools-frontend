import React from 'react';
import Image from 'next/image';
import Button from 'src/components/Button';
import { domainConfig } from 'src/config/domainConfig';
import Link from 'next/link';
export default function HostelAdminHeader() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-10 md:px-16 py-8 md:py-12 bg-white w-full min-h-[90vh]">
      <div className="flex-1 flex flex-col items-start justify-center max-w-xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 leading-tight">
          {domainConfig.appSlogan}
        </h1>
        <p className="text-lg md:text-xl font-semibold text-cyan-400">
          {domainConfig.appDescription}
        </p>
        <Link href="https://hostelpilot.com" target="_blank" className="inline-block bg-cyan-300 text-white font-bold px-4 py-2 rounded-lg text-lg shadow-md">
          Linked With Hostelpilot.com
        </Link>
  
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/signup">
          <Button label="Get started" className="btn btn-primary text-base font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            Get started
          </Button>
          </Link>
          <Link href="/signup">
          <button className="btn btn-ghost text-base font-semibold flex items-center gap-2 hover:bg-cyan-50 rounded-lg px-4 py-3 transition-colors">
            Learn More <span className="text-xl">&rarr;</span>
          </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 relative h-[300px] md:h-auto w-full">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src="/hero.png"
            alt="Hotel Management System Hero"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </header>
  );
}
