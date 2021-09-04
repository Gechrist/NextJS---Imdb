import React from 'react';
import Tmdb from '../assets/logo/tmdb.svg'
import Image from 'next/image'


const Footer = () => {
    return (
            <div className="w-full lg:w-main p-2 lg:ml-menu h-auto bg-black text-center absolute bottom-0">
                <a className="text-sm md:text-base hover:font-bold" rel="noreferrer" href="https://github.com/Gechrist/NextJS---Imdb" target="_blank">Github repository</a>
                <p>This product uses the TMDb API but is not endorsed or certified by TMDb</p>
                <div className="relative h-2 md:h-6"><Image aria-label="Tmdb logo" src = {Tmdb} layout='fill' objectFit="contain" alt='tmdb logo'/></div>
            </div>
    )
}

export default Footer
