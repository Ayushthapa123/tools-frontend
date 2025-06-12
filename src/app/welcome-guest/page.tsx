'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WelcomeGuestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-200 to-secondary/5">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Welcome Header with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="rounded-full bg-primary/10 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-5xl font-bold text-base-content"
          >
            Welcome Aboard!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mx-auto max-w-2xl text-xl text-base-content/70"
          >
            Thank you for joining our community. Your journey to the hostel life begins here.
          </motion.p>
        </motion.div>

        {/* Main Content Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Explore Hostels Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="card group bg-base-100 shadow-xl transition-all hover:shadow-2xl"
          >
            <div className="card-body">
              <div className="mb-4 rounded-lg bg-primary/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="card-title text-2xl">Explore Hostels</h2>
              <p className="text-base-content/70">
                Discover unique accommodations around the world. Find your perfect stay with our curated selection of hostels.
              </p>
              <div className="card-actions mt-4">
                <Link
                  href="https://hostelpilot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-block"
                >
                  Start Exploring
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Get Started Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="card group bg-base-100 shadow-xl transition-all hover:shadow-2xl"
          >
            <div className="card-body">
              <div className="mb-4 rounded-lg bg-secondary/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="card-title text-2xl">Quick Hostel Tips</h2>
              <p className="text-base-content/70">
                Make friends, Stay Social, and Make Memories
              </p>
              <div className="card-actions mt-4">
                <Link href="/hostel-life-guides" className="btn btn-secondary btn-block">
                  View More Tips
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-lg text-base-content/70">
            Need help? Our support team is just a click away
          </p>
          <Link href="/contact" className="btn btn-outline btn-lg">
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
