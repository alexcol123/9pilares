import { ScrollArea } from "@/components/ui/scroll-area"
import ProductReviews from "@/components/myComponents/review/ProductReviews"
import { fetchProductReviews } from "@/utils/actions"

const ProductReviewContainer =async ({productoId}:{productoId:string}) => {


  const reviews = await fetchProductReviews(productoId)

   if (reviews.length < 1) return 





  return (

    <ScrollArea className=" max-h-80 w-full border overflow-auto p-4  rounded-xl bg-muted">


    <ProductReviews reviews={reviews}  />

  </ScrollArea>
  )
}
export default ProductReviewContainer