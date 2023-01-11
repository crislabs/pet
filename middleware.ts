import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"
import { petGetSiteByAdmin } from './lib/site/getSite'

export default withAuth(
  async function middleware(req) {
    // if (req.nextUrl.pathname.startsWith('/admin')) {
    //   // const site = await petGetSiteByAdmin(process.env.NEXT_PUBLIC_SITE_URL as string)
    //   // console.log('site', site)
    //   console.log('middleware');
      
    //   return NextResponse.rewrite(new URL('/admin/sites', req.url))
    // }
    // req.cookies.set({name: 'garritas', value: site.dataSite.adminSite.map(data => data.sid).toString() })
    // console.log('req', req.cookies.getAll())
    // console.log('req', req.cookies.get('garritas')?.value.split(','))
    // // const token = await getToken({ req })
    // console.log('token', token)
  },
  {
    callbacks: {
      authorized: ({req, token }) => ['63b0d0a47a5228bde1bcf133', '63b2adf8328b13dc231f1df4'].includes(token?.sid as string),
      // authorized: ({req, token }) => req.cookies.get('garritas')!.value.split(',').includes(token?.sub!),
    },
  }
)

export const config = { matcher: ["/dashboard/:path*"] }