import React, {useEffect, useCallback,useState } from "react";
import { useRecursiveTimeout } from "../lib/Carousel/useRecursiveTimeout";
import { useEmblaCarousel } from 'embla-carousel/react'

const AUTOPLAY_INTERVAL = 3500;

const EmblaCarousel = ({children, direction, position, haveAutoplay}) => {
  const [viewportRef, embla, emblaApi] = useEmblaCarousel(direction?{skipSnaps:false, axis:'y',align:'start'}:
  {skipSnaps:false,align:'start'});
  const [directionStyle, setDirectionStyle] = useState('')
  const [positionStyle, setPositionStyle] = useState('')
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [slidesInView, setSlidesInView] = useState([]);

  //autorun  
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
    
     const {play} =  useRecursiveTimeout(autoplay, AUTOPLAY_INTERVAL);
      
      useEffect(() => {
       haveAutoplay && play();
      }, [haveAutoplay,play]);

    //lazy-loading
    const onSelect = useCallback(() => {
      if (!embla) return;
      setPrevBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    const findSlidesInView = useCallback(() => {
      if (!embla) return;

      setSlidesInView((slidesInView) => {
        if (slidesInView.length === embla.slideNodes().length) {
          embla.off("select", findSlidesInView);
        }
        const inView = embla
          .slidesInView(true)
          .filter((index) => slidesInView.indexOf(index) === -1);
        return slidesInView.concat(inView);
      });
    }, [embla]);

useEffect(() => {
  if (!embla) return;
  onSelect();
  findSlidesInView();
  embla.on("select", onSelect);
  embla.on("select", findSlidesInView);
}, [embla, onSelect, findSlidesInView]);
    
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