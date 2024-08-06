import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([

  '/bookings(.*)',
  '/favoritos(.*)',
  '/mis-compras(.*)',
  '//mis-productos(.*)',
  '/reviews(.*)',
  '/mis-ventas(.*)',
  '/perfil(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}