import { golosText } from '@/shared/config/fonts';
import Sidebar from '@/widgets/sidebar/ui';
import { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="uz">
      <body className={`${golosText.variable} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="ml-64 flex-1 flex flex-col">
            <div className="p-8 max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
