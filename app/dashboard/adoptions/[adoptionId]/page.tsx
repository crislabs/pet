import { petGetAdoption } from '@/lib/product/adoptions/getAdoption';
import { AdoptionOverviewsPet } from '@/ui/AdoptionOverviewsPet';
import React, { use } from 'react'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: { adoptionId: string }
}

export default function Page(props: Props) {
  const { params } = props
  const adoption = use(petGetAdoption(params.adoptionId))
  return (
    <AdoptionOverviewsPet adoption={adoption} />
  )
}
