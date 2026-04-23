"use client"

import * as fonts from '@/shared/config/fonts';
import Sidebar from '@/widgets/sidebar/ui';
import QueryProvider from '@/shared/config/react-query/QueryProvider';
import { ReactNode } from 'react';
import './globals.css';
import { usePathname } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  const pathname = usePathname();


  if (pathname === "/login" || pathname === "/otp") {
    return (
      <html lang="uz">
        <body className={`${fonts.golosText.variable} antialiased`}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </body>
      </html>
    )
  }

  return (
    <html lang="uz">
      <body className={`${fonts.golosText.variable} antialiased`}>
        <QueryProvider>
          <div className="flex min-h-screen">
            <Sidebar />

            <main className="ml-64 flex-1 flex flex-col">
              <div className="p-8 max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
