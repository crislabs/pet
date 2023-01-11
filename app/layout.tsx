import { petGetSiteStoreNavigation } from '@/lib/site/getSite';
import { ReactQueryProvider } from '@/src/providers/ReactQueryContext';
import { SessionAuthProvider } from '@/src/providers/SessionContext';
import { UIProvider } from '@/src/providers/UIContext';
import '@/styles/globals.css';
import { Header } from '@/ui/Header';
import React, { use } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = use(petGetSiteStoreNavigation(process.env.NEXT_PUBLIC_SITE_URL as string));

  return (
    <html>
      <head>
        <title>Garritas</title>
        <link
          rel="icon"
          type="image/x-icon"
          className="remove-bg"
          href={site.dataSite.imageSite?.logo?.src}
        />
      </head>
      <body>
        <UIProvider>
          <SessionAuthProvider>
            <ReactQueryProvider>
              <Header site={site} />
              {children}
            </ReactQueryProvider>
          </SessionAuthProvider>
        </UIProvider>
      </body>
    </html>
  );
}
