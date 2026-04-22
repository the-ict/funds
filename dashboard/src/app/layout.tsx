import { golosText } from '@/shared/config/fonts';
import { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="uz">
      <body className={`${golosText.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
