'use client';

import GlobalToast from "src/components/GlobalToast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <GlobalToast />
      {children}
    </div>
  );
} 