import { CreatePage, Page } from "@/src/interfaces/page";

export async function petCreatePage2(
  input: CreatePage,
): Promise<Page> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      mutation PetCreatePage2($input: CreatePage!) {
        petCreatePage2(input: $input) {
          _id
            dataPage{
              type
              seoPage{
                title
              }
            }
          slug
          parentId
        }
      }
    `,
      variables: { input },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.petCreatePage2)
}
