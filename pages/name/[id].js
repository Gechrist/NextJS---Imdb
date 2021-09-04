import {React,useState} from 'react';
import Image from 'next/image'
import ErrorMessage from '../../components/ErrorMessage';
import Layout from '../../components/Layout';
import Poster from '../../components/Poster';
import Info from '../../components/Info';
import Credits from '../../components/Credits';
import EmblaCarousel from '../../components/Carousel';
import MetaTitle from '../../components/MetaTitle';
import getData from '../../helpers/ApiQueries';

const API_OPTIONS = process.env.NEXT_PUBLIC_TMDB_API_OPTIONS_NAME

const Name = ({data,role}) => {
    const [isShowImages,setIsShowImages] = useState(false);
    const [isShowInfo,setIsShowInfo] = useState(false);
    const [isShowFilmography,setIsShowFilmography] = useState(false);

    return (
        data.success === false?<ErrorMessage/>: 
        <main className="lg:ml-menu lg:w-main w-full flex flex-col pt-6 px-2 lg:px-10">
          {data?.title?<MetaTitle title={`${data?.title}`}/>:<MetaTitle title={`${data?.name}`}/>}
          <div className="flex flex-row w-full h-80 xl:h-96">
            <section className="flex w-full flex-col space-y-8">
                <h1 className="text-2xl md:text-3xl lg:text-5xl">{data?.name}</h1>
                <div className="flex flex-col space-y-1">
                <p>{role?.role}</p>
                <p>{data?.birthday && `${data?.birthday?.substr(0,4)} - `}{data?.deathday && data?.deathday?.substr(0,4)}</p>
                <p>{data?.place_of_birth && `Born at ${data?.place_of_birth}`}</p>
                </div>  
                <div className="flex flex-col">
                  <p>{role?.awards}</p>
                </div>
            </section>
            <Poster path={data?.profile_path}/>
          </div>
          <div className="relative">
          <nav className={`flex flex-row justify-between w-full mt-28 md:mt-20 lg:mt-26 h-auto divide-x 
          divide-white border-2 border-white`}>
            {data?.images.profiles && <button type="button" onClick={() =>{setIsShowImages(previsShowImages => !previsShowImages);
            setIsShowInfo(false); setIsShowFilmography(false)}} className="bg-transparent w-full active:bg-white 
            active:text-black hover:font-bold p-2 text-white">Images</button>}
            <button type="button" onClick={() =>{setIsShowInfo(previsShowInfo => !previsShowInfo);
            setIsShowImages(false);setIsShowFilmography(false)}} className="bg-transparent w-full  active:bg-white 
            active:text-black hover:font-bold p-2 text-white">Info</button>
            <button className="bg-transparent w-full  active:bg-white active:text-black hover:font-bold 
            p-2 text-white" type="button" onClick={() =>{setIsShowFilmography(previsShowFilmography => !previsShowFilmography);
            setIsShowImages(false);setIsShowInfo(false)}}>Filmography</button>
          </nav>
          {isShowImages? data?.images.profiles? <EmblaCarousel direction='' position='absolute bottom-12 md:bottom-14 xl:bottom-18 2xl:bottom-26'> 
          {data?.images.profiles.slice(0,6).map((item,index) => ( 
                <div key={index} className="embla__slide relative flex-grow-0 flex-shrink-0 flex-basis-65 md:flex-basis-25">
                <Image  src={`https://image.tmdb.org/t/p/w1280${item?.file_path}`} 
                width={item.width} height={item.height} alt='Image not found' aria-label='Various Images Carousel'/>
                </div>))}</EmblaCarousel>:<p className="absolute bottom-16 text-xl"> No Images Available</p>:null}
          {isShowInfo?<Info info={data?.biography}/>:
          isShowFilmography?<Credits credits={data?.combined_credits} type='name'/>:''}
          </div>
        </main>
            
    )
}

Name.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export  async function getServerSideProps({params}) {
    let data = await getData("person",`${params.id}`,API_OPTIONS);
    let role = await getData("Name",`${data.imdb_id}`);
  return { props: {data,role}}
  }

export default Name