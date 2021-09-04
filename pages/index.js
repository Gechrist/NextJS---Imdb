import styles from '../styles/Home.module.css'
import getData from '../helpers/ApiQueries';
import EmblaCarousel from '../components/Carousel';
import Poster from '../components/Poster';
import Layout from '../components/IndexLayout';
import MetaTitle from '../components/MetaTitle';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const API_OPTIONS_BOX = process.env.NEXT_PUBLIC_TMDB_API_OPTIONS_LINK
const API_OPTIONS_POP = process.env.NEXT_PUBLIC_TMDB_API_OPTIONS_POP

const Home=({boxOffice,popMovies,popTVSeries,popActors}) => {
  const Router = useRouter()

  async function getLink (id) {
    let link = await getData('find', `${id}`, API_OPTIONS_BOX);
    Router.push(`/title/movie/${link.movie_results[0].id}`)
  }
  return (
    <div className="lg:ml-menu lg:w-main w-full flex flex-col pt-6 px-2 lg:px-10 overflow-y-auto">
      <MetaTitle title=''/>
      <section className="flex w-full flex-col space-y-4 xl:space-y-2">
        <h1 className="text-2xl md:text-3xl 3xl:text-5xl pb-4" id='boxOffice'>
            Box Office
        </h1>
        {boxOffice? <EmblaCarousel direction ='flex-col h-72 divide-y-2 divide-y-white' position =''> {boxOffice?.items.map((item,index) => ( 
              <div  key={index} onClick={()=> getLink(item.id)} className="flex flex-row justify-evenly items-center hover:cursor-pointer">
                <div className='flex justify-center w-1/3'>
                  <p className='rounded-full w-12 h-12 flex items-center justify-center ring-2 ring-white text-xl'>{item?.rank}</p>
                </div> 
                <div className='text-xl flex justify-center w-1/3'>
                  {item?.title}
                </div>   
                <div className='embla__slide w-1/3 flex justify-center relative flex-grow-0 flex-shrink-0'>
                <Image src={item.image} width={100} height={150} alt='Image not found' aria-label='Various Images Carousel'/>
                </div>
              </div>))}</EmblaCarousel>:<p>Box Office Not Available</p>}
      </section>
      <section className="flex w-full flex-col pt-24 mb-4 space-y-4 xl:space-y-2">
        <h1 className="text-2xl md:text-3xl 3xl:text-5xl" id='popMovies'>
            Popular Movies
        </h1>
        {popMovies? <EmblaCarousel direction ='' position =''> {popMovies?.results.map((item,index) => (
          <div key={index} className='mx-1 py-4'>
            <Link href={`/title/movie/${item?.id}`} passHref>
              <div className='flex flex-col h-auto hover:cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out transform'>
                <div className='embla__slide relative border-2 rounded-t-lg border-yellow-300 flex-grow-0 h-80 flex-shrink-0 w-72'>
                  <Poster path={item?.poster_path}/>
                </div>
                <div className='py-2 text-center w-full rounded-b-lg text-black bg-yellow-300 overflow-auto'>
                  {item?.title}
                </div>    
              </div></Link></div>))}</EmblaCarousel>:<p>Popular Movies Not Available</p>}
      </section>
      <section className="flex w-full flex-col pt-24 mb-4 space-y-4 xl:space-y-2">
        <h1 className="text-2xl md:text-3xl 3xl:text-5xl" id='popTVSeries'>
            Popular TV Series
        </h1>
        {popTVSeries? <EmblaCarousel direction ='' position =''> {popTVSeries?.results.map((item,index) => (
          <div key={index} className='mx-1 py-4'>
            <Link href={`/title/tv/${item?.id}`} passHref>
              <div className='flex flex-col h-auto hover:cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out 
              transform'>
                <div className='embla__slide relative border-2 rounded-t-lg border-yellow-300 flex-grow-0 h-80 flex-shrink-0 w-72'>
                  <Poster path={item?.poster_path}/>
                </div>
                <div className='py-2 text-center w-full rounded-b-lg text-black bg-yellow-300 overflow-auto'>
                  {item?.name}
                </div>    
              </div></Link></div>))}</EmblaCarousel>:<p>Popular TV Series Not Available</p>}
      </section>
      <section className="flex w-full flex-col py-24 mb-4 space-y-4 xl:space-y-2">
        <h1 className="text-2xl md:text-3xl 3xl:text-5xl" id='popActors'>
            Popular Actors
        </h1>
        {popActors? <EmblaCarousel direction ='' position =''> {popActors?.results.map((item,index) => (
          <div key={index} className='mx-1 py-4'>
            <Link href={`/name/${item?.id}`} passHref>
              <div className='flex flex-col h-auto hover:cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out 
              transform'>
                <div className='embla__slide relative border-2 rounded-t-lg border-yellow-300 flex-grow-0 h-80 flex-shrink-0 w-72'>
                  <Poster path={item?.profile_path}/>
                </div>
                <div className='py-2 text-center w-full rounded-b-lg text-black bg-yellow-300 overflow-auto'>
                  {item?.name}
                </div>    
              </div></Link></div>))}</EmblaCarousel>:<p>Popular Actors Not Available</p>}
      </section>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getServerSideProps() {
  let boxOffice = await getData("boxOffice");
  let popMovies = await getData("movie/popular",'',API_OPTIONS_POP);
  let popTVSeries = await getData("tv/popular",'',API_OPTIONS_POP);
  let popActors = await getData("person/popular",'',API_OPTIONS_POP);
return { props: {boxOffice,popMovies,popTVSeries,popActors}}
}

export default Home
