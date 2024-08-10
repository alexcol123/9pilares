
import { FaStar } from 'react-icons/fa'

async function ProductRating(
  // { vehicleId, inPage }: { vehicleId: string, inPage: boolean }
) {
  // temp

  // const {rating , count} = await fetchVehicleRating(vehicleId)  

  // const { rating, count } = await fetchVehicleRating(vehicleId)

  // if (count === 0) { return null }

  let rating = 4.5
  let count = 100
  const className = `flex gap-1 items-center  text-xs `
  const countText = count > 1 ? 'reviews' : 'review'
  const countValue = `(${count} vendidos) `

  return (
    <span className={className} >
      <FaStar className='w-3 h-3' />
      {rating} {countValue}
    </span>
  )
}

export default ProductRating