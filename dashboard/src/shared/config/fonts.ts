import localFont from 'next/font/local';

const golosText = localFont({
  src: [
    {
      path: '../../../public/fonts/golos-text-latin.woff2',
      weight: '400 800',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/golos-text-latin-ext.woff2',
      weight: '400 800',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/golos-text-cyrillic.woff2',
      weight: '400 800',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/golos-text-cyrillic-ext.woff2',
      weight: '400 800',
      style: 'normal',
    },
  ],
  variable: '--font-golos-text',
});

export { golosText };
