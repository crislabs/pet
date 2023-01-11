import { Article } from "@/src/interfaces/article";


export async function petGetArticlesBySiteId(siteId: string): Promise<Article[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query PetGetArticlesBySiteId($siteId: String!) {
        petGetArticlesBySiteId(siteId: $siteId) {
          slug
        }
      }
      `,
      variables: { siteId },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.petGetArticlesBySiteId)
}

export async function petGetArticlesByParentId(parentId: string): Promise<Article[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query PetGetArticlesByParentId($parentId: String!) {
        petGetArticlesByParentId(parentId: $parentId) {
          _id
          slug
          parentId
          dataArticle{
            seoArticle{
              title
              image{
                src
              }
            }
          }
        }
      }
      `,
      variables: { parentId },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.petGetArticlesByParentId)
}
