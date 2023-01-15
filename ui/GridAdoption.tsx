'use client';

import { petGetPage0 } from '@/lib/page/page0/getPage0';
import { petGetAdoptionsByParentId } from '@/lib/product/adoptions/getAdoptions';
import { usePagination } from '@/src/providers/PaginationContext';
import { SelectionProvider } from '@/src/providers/SelectionContext';
import { ListPage, Page } from '@/src/interfaces/page';
import { Product } from '@/src/interfaces/product';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { CardAdoption } from './CardAdoption';

import { HeadingDashboard } from './HeadingDashboard';
import { HeadingDashboardOption } from './HeadingDashboardOptions';
import { Adoption } from '@/src/interfaces/adoption';

interface Props {
  adoptions: Adoption[]
  page: Page
  parentId: string
}

export function PetGridAdoptions(props: Props) {
  const { adoptions, parentId, page } = props;


  const { data: page0 } = useQuery({
    queryKey: ['pet-get-page0', parentId],
    queryFn: () => petGetPage0(parentId),
    initialData: page,
  });
  const { data: products } = useQuery({
    queryKey: ['pet-get-adoptions', parentId],
    queryFn: () => petGetAdoptionsByParentId(parentId),
    initialData: adoptions,
  });
  // console.log('adoptions', adoptions)
  return (
    <SelectionProvider ids={products?.map(data => data._id)}>
      <HeadingDashboard title={page0.dataPage.title} page={page0} />

      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {products.map((data, i) => (
          <CardAdoption key={i} adoption={data} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}