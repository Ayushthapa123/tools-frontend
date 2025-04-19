//@ts-nocheck
"use client"

import { Carousel } from '@material-tailwind/react';

export function CarouselImageSlider() {
  return (
    <Carousel
      className="rounded-xl h-[400px]"
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
      )}
      loop={true}
      autoplay={true}
      autoplayDelay={5000}
      prevArrow={({ handlePrev }) => (
        <button
          onClick={handlePrev}
          className="absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all hover:bg-white/10 active:bg-white/20 p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}
      nextArrow={({ handleNext }) => (
        <button
          onClick={handleNext}
          className="absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all hover:bg-white/10 active:bg-white/20 p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}
    >
      <img
        src="/images/background.png"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      {/* Add more images here as needed */}
    </Carousel>
  );
}
