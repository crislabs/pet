import { graphQLClient } from "@/lib/graphqlClient";
import { Adoption, CreateAdoption, UpdateAdoption } from "@/src/interfaces/adoption";
import { CreateProduct, Product } from "@/src/interfaces/product";
import { gql } from "graphql-request";


// export async function petCreateAdoptiongq(input: CreateProduct): Promise<Product> {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//       mutation PetCreateAdoption($input: CreateProduct!) {
//         petCreateAdoption(input: $input) {
//           _id
//           slug
//           parentId
//           dataProduct{
//             seoProduct{
//               title
//               image{
//                 src
//               }
//             }
//           }
//         }
//       }
//       `,
//       variables: { input },
//     }),
//   })
//     .then(res => res.json())
//     .then((res) => res.data)
//     .then((result) => result.petCreateAdoption)
// }

export async function petUpdateAdoption(
  input: UpdateAdoption,
): Promise<Adoption> {
  const data = await graphQLClient.request(gql`
  mutation PetUpdateAdoption($input: UpdateAdoption!) {
        petUpdateAdoption(input: $input) {
          _id
          slug
          parentId
          dataAdoption{
            type{
              label
              slug
            }
            images{
              src
              alt
            }
            title
            description
            thumbnailUrl
          }
        }
      }
`, {
    input,
  });
  return data.petUpdateAdoption;
  
}
