type NavLink = {
  href: string
  label: string
}



export const mylinks: NavLink[] = [
  { href: '/admin', label: 'admin' },
  { href: '/admin/orders', label: 'admin-orders' },
  { href: '/favoritos', label: 'favoritos' },
  { href: '/mis-compras', label: 'mis compras' },
  { href: '/mis-productos/crear', label: 'crear producto' },
  { href: '/mis-productos', label: 'mis productos' },
  { href: '/figuras', label: 'figuras' },
  { href: '/reviews', label: 'reviews' },
  { href: '/mis-ventas', label: 'mis ventas' },
  { href: '/perfil', label: 'perfil' },
]

// sort navlinks by  label alphabetically
export const links = mylinks.sort((a, b) => a.label.localeCompare(b.label))