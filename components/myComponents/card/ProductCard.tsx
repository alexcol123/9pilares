import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductCardTypes } from "../home/ListaDeProductos"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UploadIcon } from "@radix-ui/react-icons"

const ProductCard = ({ producto }: { producto: ProductCardTypes }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="450"
            src={producto.imagenes[0]}
            width="450"
          />
          <div className="grid grid-cols-3 gap-2">
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="140"
                src={producto.imagenes[1]}
                width="140"
              />
            </button>
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="140"
                src={producto.imagenes[2]}
                width="140"
              />
            </button>
            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
              <UploadIcon className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>



    // <Card className="w-full h-full ">
    //   <CardHeader>
    //     <CardTitle >
    //       <div className="flex justify-between items-center">
    //         xxx
    //         {/* <p className="text-lg">   {year} {make} {model}</p>
    //         <p className="capitalize border py-1 px-2 rounded-lg bg-primary text-primary-foreground text-xs">  {type}</p> */}
    //       </div>

    //     </CardTitle>
    //     <CardDescription className="flex justify-between items-center ">


    //       <span className="font-semibold"> Price: 
    //         {/* {formatCurrency(price)} */}
    //          /day</span>
    //       {/* <VehicleRating vehicleId={vehicle.id} inPage={false} /> */}

    //     </CardDescription>

    //   </CardHeader>
    //   <CardContent className="relative">
    //     <Image width={500} height={300} alt='vehicle image' src={producto.imagenes[0]} className="object-cover rounded-md h-[185px]" />

    //     {/* <div className="absolute top-2 right-8">
    //     <FavoriteToggleButton vehicleId={id} />
    //   </div> */}

    //     <div className="flex justify-center items-center w-full mb-2">
    //       <ul className="flex justify-center items-center gap-4  bg-muted mt-4 w-fit px-2 rounded-sm">
    //         {/* <li className="flex items-center justify-center gap-1 "> <GiCarSeat /> {seats}</li>
    //       <li className="flex items-center justify-center gap-1 "> <GiCarDoor /> {doors}</li>
    //       <li className="flex items-center justify-center gap-1 "> <IoSpeedometerOutline /> 4.8 s</li> */}
    //         <li className="flex items-center justify-center gap-1 "> test ==4.8 s</li>

    //       </ul>
    //     </div>

    //   </CardContent>

    //   <CardFooter className="flex items-center justify-center gap-2">
    //     <Button variant={'outline'} className="w-full">
    //       dd
    //       {/* <CheckIcon className="mr-2 h-4 w-4" /> Book Now */}
    //     </Button>
    //     <Button asChild className="w-full">
    //       <Link href={`/vehicles/${producto.id}`}  >
    //         View More
    //       </Link>
    //     </Button>
    //   </CardFooter>
    // </Card>
  )
}
export default ProductCard


