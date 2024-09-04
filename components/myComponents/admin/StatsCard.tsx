import { Card, CardHeader } from '@/components/ui/card'

type StatsCardsProps = {
  title: string
  value: number | string
}

function StatsCards({ title, value }: StatsCardsProps) {
  return (
    <Card className='bg-muted'>
      <CardHeader className='flex flex-row justify-between items-center h-full'>
        <h3 className='capitalize text-2xl font-bold flex-1'>{title}</h3>
        <span className='text-primary text-4xl font-bold flex-1 text-right'>{value}</span>
      </CardHeader>
    </Card>
  )
}

export default StatsCards