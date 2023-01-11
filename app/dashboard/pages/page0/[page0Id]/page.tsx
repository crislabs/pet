import { petGetArticlesByParentId } from '@/lib/article/getArticles';
import { petGetPage0 } from '@/lib/page/page0/getPage0'
import { petGetPage1ByParentId } from '@/lib/page/page1/getPages';
import { petGetAdoptionsByParentId } from '@/lib/product/adoptions/getAdoptions';
import { PaginationProvider } from '@/src/providers/PaginationContext';
import { Article } from '@/src/interfaces/article';
import { Page } from '@/src/interfaces/page';
import { Product } from '@/src/interfaces/product';
import { PetGridAdoptions } from '@/ui/GridAdoption';
import React, { use } from 'react'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: { page0Id: string }
}

let adoptions: Product[] = []
let articles: Article[] = []
let pages: Page[] = []

export default function Page0(props: Props) {
  const { searchParams, params } = props
  const page = use(petGetPage0(params.page0Id))
  if (page.dataPage.type === 'adoption') {
    adoptions = use(petGetAdoptionsByParentId(params.page0Id))
  }
  // if (page.dataPage.type === 'blog') {
  //   articles = use(petGetArticlesByParentId(params.page0Id))
  // }
  // if (page.dataPage.type === 'category') {
  //   pages = use(petGetPage1ByParentId(params.page0Id))
  // }

  return (
    <PaginationProvider>
      {
        page.dataPage.type === 'adoption' && 
        <PetGridAdoptions adoptions={adoptions} page={page} parentId={params.page0Id}  />
      }
      {/* {
        page.dataPage.type === 'category' && 
        <PetGridPages1 pages={pages} parentId={params.page0Id} page = {page}/>
      }
      {
        page.dataPage.type === 'blog' && 
        <PetGridArticles articles={articles} parentId={params.page0Id} page = {page}/>
      } */}
    </PaginationProvider>
  )
}
