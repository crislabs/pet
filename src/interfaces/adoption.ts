import { Image, Seo, UpdateDate } from "./site";

export interface Adoption {
  _id: string;
  dataAdoption: DataAdoption;
  parentId: string
  slug: string
}

export interface DataAdoption {
  title: string
  description: string
  thumbnailUrl: string
  siteId: string
  type: Type
  mark: Type
  inStock: number
  price: number
  discountPrice: number
  promotion: Type
  details: string
  featured: string
  specs: string
  tags: {
    uid: string
    text: string
    slug: string
  }
  images: Image[]
  updateDate: UpdateDate
}

export interface Type {
  label: string
  slug: string
}

export interface ListAdoption {
  page: ConnectionAdoption
  pageData: PageDataAdoption
}
export interface ConnectionAdoption {
  edges: EdgeAdoption[]
  pageInfo: PageInfoAdoption
}
export interface EdgeAdoption {
  cursor: string
  node: Adoption
}
export interface PageInfoAdoption {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}
export interface PageDataAdoption {
  count: number
  limit: number
  offset:number
}

export interface CreateAdoption {
  title: string
  description: string
  uid: string
  siteId: string
  parentId: string
  type: string
}
export interface UpdateAdoption {
  id: string
  title: string
  description: string
  uid: string
  siteId: string
  parentId: string
  type: string
}

export interface UpdateDetailAdoption {
  id: string
  text: string
  uid: string
}
export interface UpdateSpecsAdoption {
  id: string
  text: string
  uid: string
}