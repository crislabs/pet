'use client';
import React from 'react';
// import { hardwareStoreGetPage0 } from '@/lib/hardware-store/page/page0/getPage';
// import { hardwareStoreGetPage1 } from '@/lib/hardware-store/page/page1/getPage';
// import { hardwareStoreGetPage2 } from '@/lib/hardware-store/page/page2/getPage';
// import { hardwareStoreGetProduct } from '@/lib/hardware-store/products/getProduct';
// import { hardwareStoreGetSite } from '@/lib/hardware-store/site/getSite';
import { useUI } from '@/src/providers/UIContext';
import { Article } from '@/src/interfaces/article';
import { Page } from '@/src/interfaces/page';
import { Product } from '@/src/interfaces/product';
import { Site } from '@/src/interfaces/site';
import { getQuery } from '@/src/utils';
import { FolderPlusIcon, PencilIcon } from '@heroicons/react/24/solid';
import { SlideOversCart } from './SlideOversCart';
import { FormPage } from './FormPage';
import { useSearchParams } from 'next/navigation';
import { FormAdoption } from './FormAdoption';
import { Adoption } from '@/src/interfaces/adoption';
// import { FormProduct } from './FormProduct';
// import { FormDetails } from './FormDetails';
// import { FormSpecs } from './FormSpecs';
// import { FormArticle } from './FormArticle';
// import { FormContent } from './FormContent';

interface Props {
  title?: string,
  page?: Page;
  article?: Article;
  site?: Site;
  product?: Product;
  adoption?: Adoption;
}

export function HeadingDashboard(props: Props) {
  const { page, site, article, product, title, adoption } = props;
  const query = getQuery();
  const searchParams = useSearchParams();
  // console.log('query', query)

  const {
    childrenDashboard: { childrens, setChildrens },
    toggleSlideOversForm: { value, actions: { toggle } }
  } = useUI();
  const handleClickEdit = () => {
    console.log('Click Edit');
    toggle();
    if (query.length === 4) setChildrens(<FormPage page={page} />);
    if (query.length === 3 && searchParams.get('type') === 'adoption') {
      setChildrens(<FormAdoption adoption={adoption} />);
    }
    // if (query.length === 3 && query[1] === 'products') setChildrens(<FormProduct product={product} />);
    // if (query.length === 3 && query[1] === 'articles') setChildrens(<FormArticle article={article} />);
  }
  const handleClickAdd = () => {
    toggle();
    if (query.length === 4 && query[2] === "page2" && searchParams.get('type') === 'category') {
      setChildrens(<FormPage />);
    }
    if (query.length === 4 && query[2] === "page1" && searchParams.get('type') === 'category') {
      setChildrens(<FormPage />);
    }
    if (query.length === 4 && searchParams.get('type') === 'adoption') {
      setChildrens(<FormAdoption />);
    }
    // if (query.length === 4 && searchParams.get('type') === 'pet') {
    //   setChildrens(<FormProduct />);
    // }
    // if (query.length === 4 && searchParams.get('type') === 'blog') {
    //   setChildrens(<FormArticle />);
    // }
    if (query.length === 2) setChildrens(<FormPage />);

  }
  // const handleClickUpdateDetails = () => {
  //   toggle();
  //   setChildrens(<FormDetails product={product} />)
  // }
  // const handleClickUpdateSpecs = () => {
  //   toggle();
  //   setChildrens(<FormSpecs product={product} />)
  // }
  // const handleClickUpdateContent = () => {
  //   toggle();
  //   setChildrens(<FormContent article={article} />)
  // }
  return (
    <div>
      <div className="flex lg:items-center justify-between">

        <div className="min-w-0 flex space-x-2">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
          <span className="block">
            <button
              type="button"
              className="btn-default"
              onClick={() => handleClickEdit()}
            >
              <PencilIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              <p className="hidden sm:block">Edit</p>
            </button>
          </span>
        </div>
        <div className="flex">
          {
             !['products','articles'].includes(query[1])  &&
          <span className="block">
            <button className="btn-primary space-x-3"
              onClick={() => handleClickAdd()}
            >
              <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
              <p className="hidden sm:block">
                {query.length === 2 && 'Add Page'}
                {query.length === 4 && searchParams.get('type') === 'page' && 'Add Page'}
                {query.length === 4 && searchParams.get('type') === 'adoption' && 'Add Adoption'}
                {query.length === 4 && searchParams.get('type') === 'blog' && 'Add Article'}
                {query.length === 4 && searchParams.get('type') === 'category' && 'Add Category'}
                {query.length === 4 && searchParams.get('type') === 'pet' && 'Add Product'}
                {query.length === 3 && searchParams.get('type') === 'adoption' && 'Add Info'}
              </p>
            </button>
          </span>
          }
          {
            query[1] === 'products' &&
          <span className="block space-x-3">
            <button className="btn-primary space-x-3"
            >
              <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
              <p className="hidden sm:block">
                Add Details
              </p>
            </button>
            <button className="btn-primary space-x-3"
              // onClick={() => handleClickUpdateSpecs()}
            >
              <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
              <p className="hidden sm:block">
                Add Specs
              </p>
            </button>
          </span>
          }
          {
            query[1] === 'articles' &&
          <span className="block space-x-3">
            <button className="btn-primary space-x-3"
              // onClick={() => handleClickUpdateContent()}
            >
              <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
              <p className="hidden sm:block">
                Add Content
              </p>
            </button>
            {/* <button className="btn-primary space-x-3"
              onClick={() => handleClickUpdateSpecs()}
            >
              <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
              <p className="hidden sm:block">
                Add Specs
              </p>
            </button> */}
          </span>
          }
        </div>
        
      </div>
      
      <SlideOversCart children={childrens} />
    </div>
  );
}