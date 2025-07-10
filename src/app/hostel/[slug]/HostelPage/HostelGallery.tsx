"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { GalleryData, Hostel } from 'src/gql/graphql'

export default function HostelGallery({hostel}:{hostel:Hostel | null | undefined}) {

  const [ mainImage, setMainImage ] = useState(0);
  const selectedImg = hostel?.data?.gallery?.filter(img => img.isSelected === true);



  return (
    <div>
                <div className="relative mb-4 h-[300px] md:h-[500px] w-full overflow-hidden rounded-2xl bg-gray-200">
                  <div className="group relative h-full w-full">
                    <Image
                      src={
                        selectedImg?.[ 0 ]?.url ??
                        hostel?.data?.gallery?.[ mainImage ]?.url ??
                        '/images/default-image.png'
                      }
                      alt={`Room image ${mainImage + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={90}
                    />
                  </div>
                </div>

                <div className="mb-8 grid grid-cols-6 gap-3">
                  {hostel?.data?.gallery?.slice(0, 6).map((img: GalleryData, index: number) => (
                    <div
                      key={img.url}
                      className={`relative h-24 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-200 hover:opacity-90
                    ${mainImage === index ? 'ring-blue-600 ring-2 ring-offset-2' : ''}`}
                      onClick={() => setMainImage(index)}
                    >
                      <Image
                        src={img.url ?? '/images/default-image.png'}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                </div>
  )
}       