import { Input } from "@/components/ui/input"

function NavSearch() {
  return (
    <Input
      type='search'
      placeholder='Busca por nombre...'
      className='max-w-xs dark:bg-muted '
    />
  )
}
export default NavSearch