import { Adoption } from "@/src/interfaces/adoption";
import { Product } from "@/src/interfaces/product";


export async function petGetAdoptionsByParentId(parentId: string): Promise<Adoption[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query PetGetAdoptionsByParentId($parentId: String!) {
        petGetAdoptionsByParentId(parentId: $parentId) {
          _id
          slug
          parentId
          dataAdoption{
            type{
              label
              slug
            }
            title
            description
            thumbnailUrl
            
          }
        }
      }
      `,
      variables: { parentId },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.petGetAdoptionsByParentId)
}
