
import { fetchProductReviews } from '@/utils/actions'
import Title from '../products/Title'
import ReviewCard from './ReviewCard'


type ReviewType = {
  
    id: string
    rating: number
    comment: string
    Perfil: {
      nombre: string,
      imagenPerfil: string
    } |null
  
}

async function PropertyReviews({ reviews }: { reviews: ReviewType[] }) {
  

  // if (reviews.length < 1) return null
console.log(reviews)



  return (
    <div className='mt-8'>
      <Title text='Reviews' />
      <div className='grid md:grid-cols-2 gap-8 mt-4 '>
        {reviews.map((review) => {

          if (!review.Perfil) return null

          const { comment, rating } = review
          const { nombre, imagenPerfil } = review.Perfil
          const reviewInfo = {
            comment,
            rating,
            name: nombre,
            image: imagenPerfil,
          }
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />
        })}
      </div>
    </div>
  )
}
export default PropertyReviews