import { Site } from "@/src/interfaces/site";

export const PET_GET_SITE = `
query PetGetSite($id: String!) {
  petGetSite(id: $id) {
    _id
    dataSite {
      name
      description
      type
      dbSite {
        uid
        label
        slug
      }
      infoSite{
        clientId
      }
      imageSite {
        banner {
          src
          alt
        }
        logo {
          src
          alt
        }
        icon {
          src
          alt
        }
      }
    }
    url
  }
}
`;

export async function petGetSite(id: string):Promise<Site> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: PET_GET_SITE,
      variables: {id: id},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.petGetSite) 
}

export async function petGetSiteByAdmin(id: string):Promise<Site> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query PetGetSite($id: String!) {
        petGetSite(id: $id) {
          dataSite {
            name
            adminSite{
              sid
            }
          }
        }
      }
      `,
      variables: {id: id},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.petGetSite) 
}

export async function petGetSiteStoreNavigation(id: string):Promise<Site> {
   return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query PetGetSite($id: String!) {
        petGetSite(id: $id) {
          _id
          dataSite {
            title
            description
            type{
              label
              slug
            }
            imageSite {
              icon {
                src
                alt
              }
              logo {
                src
                alt
              }
            }
          }
          pages{
            _id
            dataPage{
              type{
                label
                slug
              }
              title
            }
            slug
            
          }
        }
      }
      `,
      variables: {id: id},
    }),
  })
  .then(res => res.json())
  .then((res)=> res.data)
  .then((result) => result.petGetSite) 
}
