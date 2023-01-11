import { Product } from "@/src/interface/product.interface";


export async function petGetAdoptionsByParentId(parentId: string): Promise<Product[]> {
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
          dataProduct{
            seoProduct{
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
    .then((result) => result.petGetAdoptionsByParentId)
}
