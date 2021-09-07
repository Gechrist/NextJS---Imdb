import React, {useEffect, useCallback,useState } from "react";
import { useRecursiveTimeout } from "../lib/Carousel/useRecursiveTimeout";
import { useEmblaCarousel } from 'embla-carousel/react'

const AUTOPLAY_INTERVAL = 3500;

const EmblaCarousel = ({children, direction, position}) => {
  const [viewportRef, embla, emblaApi] = useEmblaCarousel(direction?{skipSnaps:false, axis:'y',align:'start'}:
  {skipSnaps:false,align:'start'});
  const [directionStyle, setDirectionStyle] = useState('')
  const [positionStyle, setPositionStyle] = useState('')
  
  const autoplay = useCallback(() => {
    if (!embla) return;
    if (embla.canScrollNext()) {
      embla.scrollNext();
    } else {
      embla.scrollTo(0);
    }
  }, [embla]);
  
  useEffect(()=>{
    direction && setDirectionStyle(direction)
    position && setPositionStyle(position)
      },[direction, position])
    
      const {play} = useRecursiveTimeout(autoplay, AUTOPLAY_INTERVAL);
      
      useEffect(() => {
        play();
      }, [play]);
    
    return (
        <div className={`embla overflow-hidden bg-black ${positionStyle}`}
         ref={viewportRef}>
            <div className={`embla__container flex ${directionStyle}`}>
              {children}
            </div>
        </div>
    )        
}    

export default EmblaCarousel