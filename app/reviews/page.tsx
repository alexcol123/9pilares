// import EmptyList from '@/components/home/EmptyList'
// import { deleteReviewAction, fetchPropertyReviewsByUser } from '@/utils/actions'
// import ReviewCard from '@/components/reviews/ReviewCard'
// import Title from '@/components/properties/Title'
// import FormContainer from '@/components/form/FormContainer'
// import { IconButton } from '@/components/form/Buttons'

import { IconButton } from "@/components/myComponents/form/Buttons"
import FormContainer from "@/components/myComponents/form/FormContainer"
import ListaVacia from "@/components/myComponents/home/ListaVacia"
import Title from "@/components/myComponents/products/Title"
import ReviewCard from "@/components/myComponents/review/ReviewCard"
import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions"
import loading from "./loading"
import LoadingReviewCards from "@/components/myComponents/review/LoadingReviewCards"


async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser()
  if (reviews.length === 0) return <ListaVacia />




  return (
    <>
      <Title text='Your Reviews' />
      <section className='grid md:grid-cols-2 gap-8 mt-4 '>
        {reviews.map((review) => {

    

          const { comment, rating } = review
          const { nombre, imagenes } = review.Producto!

          const reviewInfo = {
            comment,
            rating,
            name: nombre,
            image : imagenes[0]
          }
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          )
        })}
      </section>
    </>
  )
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId })
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default ReviewsPage