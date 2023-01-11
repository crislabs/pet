import { petGetSiteStoreNavigation } from "@/lib/site/getSite";
import HeaderDashboard from "@/ui/HeaderDashboard";
import React, { use } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = use(petGetSiteStoreNavigation(process.env.NEXT_PUBLIC_SITE_URL as string))
  return (
    <React.Fragment>
      <HeaderDashboard site={site}/>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </React.Fragment>
  );
}
