
import { count } from "console";
import { FaStar } from "react-icons/fa6";

import { FaStarHalf } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";


async function ProductRating(
  // { vehicleId, inPage }: { vehicleId: string, inPage: boolean }
) {
  // temp

  // const {rating , count} = await fetchVehicleRating(vehicleId)  

  // const { rating, count } = await fetchVehicleRating(vehicleId)

  // if (count === 0) { return null }

  let count = 10
  const rating = 3.5
  let ratingPlaceholder = rating

  const ratingArray = Array.from({ length: 5 }, (_, i) => {


    console.log(ratingPlaceholder)

    if (ratingPlaceholder >= 1) {
      ratingPlaceholder -= 1
      return 'full'
    } else if (ratingPlaceholder >= 0.5) {
      ratingPlaceholder -= 1
      return 'half'
    } else {
      ratingPlaceholder -= 1
      return 'empty'
    }

  })

  const starsRatingDiv = <div className="flex">
    {ratingArray.map((rating, index) => {
      if (rating === 'full') {
        return <FaStar key={index} className='w-3 h-3 text-primary' />
      } else if (rating === 'half') {
        return <FaStarHalf key={index} className='w-3 h-3 text-primary' />
      } else {
        return <FaRegStar key={index} className='w-3 h-3 text-gray-300' />
      }
    })}

  </div>

  return (
    <div className="flex items-center ">
      {starsRatingDiv}
      {/* {count && <span className="text-sm  ml-1">({count})</span>} */}
      {/* <p className="text-xs ml-1">
       (15 vendidos)
      </p> */}

    </div>
  )

}


export default ProductRating