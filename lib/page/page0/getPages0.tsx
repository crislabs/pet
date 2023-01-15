import { Page } from "@/src/interfaces/page";
import { ListInput } from "@/src/interfaces/site";


// export async function petGetPages0(): Promise<Page[]> {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//       query PetGetPages0{
//         petGetPages0{
//           _id
//           parentId
//           siteId
//         }
//       }
//       `,
//       variables: {},
//     }),
//   })
//     .then(res => res.json())
//     .then((res) => res.data)
//     .then((result) => result.petGetPages0)
// }

export async function petPages0ByParentId(parentId: string): Promise<Page[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query PetGetPages0ByParentId($parentId: String!){
        petGetPages0ByParentId(parentId: $parentId) {
          _id
          dataPage{
            type{
              label
              slug
            }
            title
            description
            thumbnailUrl
          }
          slug
        }
      }
      `,
      variables: { parentId },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.petGetPages0ByParentId)
}
// export async function petPages0ByParentIdByPagination( listInput: ListInput, parentId: string): Promise<Page[]> {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//       query PetGetPages0ByParentIdByPagination($listInput: ListInput!, $parentId: String!){
//         petGetPages0ByParentIdByPagination(listInput: $listInput, parentId: $parentId) {
//           _id
//           dataPage{
//             type
//             seoPage{
//               title
//               image{
//                 src
//                 alt
//               }
//             }
//           }
//           slug
//         }
//       }
//       `,
//       variables: { listInput, parentId },
//     }),
//   })
//     .then(res => res.json())
//     .then((res) => res.data)
//     .then((result) => result.petGetPages0ByParentIdByPagination)
// }
// export async function petPages0BySiteId(siteId: string): Promise<Page[]> {
//   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//       query PetGetPages0BySiteId($siteId: String!){
//         petGetPages0BySiteId(siteId: $siteId) {
//           _id
//         }
//       }
//       `,
//       variables: { siteId: siteId },
//     }),
//   })
//     .then(res => res.json())
//     .then((res) => res.data)
//     .then((result) => result.petGetPages0BySiteId)
// }