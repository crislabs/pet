import { Article } from "@/src/interfaces/article";


export async function petGetArticle(id: string): Promise<Article> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    body: JSON.stringify({
      query: `
      query PetGetArticle($id: String!) {
        petGetArticle(id: $id) {
          _id
          slug
          parentId
          dataArticle{
            content
            seoArticle{
              title
              description
              image{
                src
              }
            }
          }
        }
      }
      `,
      variables: { id },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.petGetArticle)
}
export async function petGetArticleBySlug(siteId: string, slug: string): Promise<Article> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    //  next: { revalidate: 60 },
    body: JSON.stringify({
      query: `
      query PetGetArticleBySlug($siteId: String!, $slug: String!) {
        petGetArticleBySlug(siteId: $siteId, slug: $slug) {
          _id
          slug
          parentId
          dataArticle{
            content
            seoArticle{
              title
              description
              image{
                src
                alt
              }
            }
          }
        }
      }
      `,
      variables: { siteId, slug },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.petGetArticleBySlug)
}
