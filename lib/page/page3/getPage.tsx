import { Page } from "@/src/interfaces/page";


export async function petGetPage3(id: string): Promise<Page> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query PetGetPage3( $id: String! ){
        petGetPage3( id: $id ) {
          _id
          slug
          parentId
          dataPage{
            type
            seoPage{
              title
              description

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
    .then((result) => result.petGetPage3)
}

