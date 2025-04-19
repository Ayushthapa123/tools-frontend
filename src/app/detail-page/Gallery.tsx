//@ts-nocheck
'use client';

import { Carousel } from '@material-tailwind/react';
import { Gallery } from 'src/gql/graphql';
interface Iprops {
  gallery: Gallery[] | undefined | null;
}

export function ImageGallery(props: Iprops) {
  const { gallery } = props;

  return (
    <Carousel
      placeholder={''}
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute z-50 flex gap-2 bottom-4 left-2/4 -translate-x-2/4">
          {new Array(length).fill('').map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}>
      {gallery?.map(gallery => (
        <div key={gallery.galleryId}>
          <img src={gallery?.url??""} alt={gallery?.caption??""} className="object-cover w-full h-full" />
        </div>
      ))}
    </Carousel>
  );
}
