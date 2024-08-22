
import { fetchProductRating } from "@/utils/actions";
import { count } from "console";
import { FaStar } from "react-icons/fa6";

import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";


async function ProductRating(
  { size = 15, productId }: { size?: number, productId: string }
) {

  const { rating, count } = await fetchProductRating(productId)


  // let count = 10
  // const rating = 3.5
  let ratingPlaceholder = rating



  const ratingArray = Array.from({ length: 5 }, (_, i) => {


    // console.log(ratingPlaceholder)

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

  const starsRatingDiv = <div className="flex my-1">
    {ratingArray.map((rating, index) => {
      if (rating === 'full') {
        return <FaStar key={index} size={size} className=' text-primary' />
      } else if (rating === 'half') {
        return <FaRegStarHalfStroke key={index} size={size} className=' text-primary' />
      } else {
        return <FaRegStar key={index} size={size} className=' text-primary' />
      }
    })}

  </div>

  return (
    <div className="flex items-center gap-2">
      {count > 0
        ? <>
          <>   {starsRatingDiv}</>
          <>  <>     {count && <span className="text-sm  ml-1">({count}) reviews</span>}</></>
        </>
        : null
      }

    </div>
  )

}


export default ProductRating