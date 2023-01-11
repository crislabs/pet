import { petPages0ByParentId } from '@/lib/page/page0/getPages0';
import { PaginationProvider } from '@/src/providers/PaginationContext';
import { PetGridPages0 } from '@/ui/GridPage0';
import React, { use } from 'react'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
  
}

export default function Page(props: Props) {
  const { searchParams } = props
  const pages = use(petPages0ByParentId( process.env.NEXT_PUBLIC_SITE_URL as string))
  return (
    <PaginationProvider>
      <PetGridPages0 pages={pages} />
    </PaginationProvider>
  )
}
