'use client'

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

import Autoplay from "embla-carousel-autoplay"



const ImagenesCarousel = ({ images , nombre}: { images: string[], nombre: string }) => {
  return (



    <Carousel className="w-full max-w-lg  rounded-xl "
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image src={image as string} alt={nombre} className="object-cover" width={500} height={500} />

                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          
        ))}


      </CarouselContent>
      <CarouselPrevious className="border border-primary " />
      <CarouselNext  className="border border-primary"  />
    </Carousel>

  )
}
export default ImagenesCarousel