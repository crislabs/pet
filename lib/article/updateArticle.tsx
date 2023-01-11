import { Article, UpdateArticle, UpdateContentArticle } from "@/src/interfaces/article";


export async function petUpdateArticle(input: UpdateArticle): Promise<Article> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      mutation PetUpdateArticle($input: UpdateArticle!) {
        petUpdateArticle(input: $input) {
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
      variables: { input },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.petUpdateArticle)
}
export async function petUpdateContentArticle(input: UpdateContentArticle): Promise<Article> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      mutation PetUpdateContentArticle($input: UpdateContentArticle!) {
        petUpdateContentArticle(input: $input) {
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
      variables: { input },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.petUpdateContentArticle)
}
