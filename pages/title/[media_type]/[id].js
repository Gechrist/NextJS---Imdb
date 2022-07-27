import { React, useState } from 'react';
import Info from '../../../components/Info';
import Video from '../../../components/title/Video';
import Layout from '../../../components/Layout';
import Credits from '../../../components/Credits';
import Poster from '../../../components/Poster';
import getData from '../../../helpers/ApiQueries';
import ErrorMessage from '../../../components/ErrorMessage';
import MetaTitle from '../../../components/MetaTitle';
import Link from 'next/link';

const API_OPTIONS = process.env.NEXT_PUBLIC_TMDB_API_OPTIONS;

const Title = (data) => {
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [isShowCast, setIsShowCast] = useState(false);
  const genres = data?.genres;
  const certifications = data?.release_dates?.results;
  const mainCast = data?.credits?.cast.slice(0, 3);
  const mainCrew = data?.credits?.crew;

  var rating = certifications?.filter((item) => item.iso_3166_1 === 'US')[0]
    ?.release_dates[0]?.certification;
  var director = mainCrew?.filter((item) => item.job === 'Director')[0]?.name;
  var directorID = mainCrew?.filter((item) => item.job === 'Director')[0]?.id;
  var documentary = genres?.filter((item) => item.name === 'Documentary');

  return data.error || !data || data.success === false ? (
    <ErrorMessage />
  ) : (
    <div className="lg:ml-menu lg:w-main w-full flex flex-col pt-6 px-2 lg:px-10">
      {data?.title ? (
        <MetaTitle title={data?.title} />
      ) : (
        <MetaTitle title={data?.name} />
      )}
      <div className="flex flex-row w-full h-80 xl:h-96">
        <section className="flex w-full flex-col space-y-4 xl:space-y-2">
          <h1 className="text-2xl md:text-3xl lg:text-5xl">
            {data?.title ? data?.title : data?.name}
          </h1>
          <div className="flex flex-col">
            <div className="flex flex-row pt-3">
              {data?.status === 'Planned' && data?.status}
              {data?.release_date ? (
                <p>
                  {documentary.length ? `TV` : `Movie`}
                  {data?.release_date &&
                    `\xa0·\xa0${data?.release_date?.substring(0, 4)}`}
                  {data?.runtime > 60 &&
                    `\xa0·\xa0${Math.trunc(data?.runtime / 60)}h`}
                  {data?.runtime
                    ? data?.runtime > 60
                      ? `\xa0${data?.runtime % 60}min`
                      : `\xa0·\xa0${data?.runtime}min`
                    : null}
                </p>
              ) : data?.first_air_date ? (
                <p>
                  TV Series
                  {data?.first_air_date &&
                    `\xa0·\xa0${data?.first_air_date?.substring(0, 4)}`}
                  {data?.episode_run_time.length > 0 && '\xa0·'}
                  {data?.episode_run_time.length > 0 &&
                    data?.episode_run_time.map((item, index) =>
                      item > 60
                        ? `\xa0${Math.trunc(item / 60)}h \xa0${item % 60}min
                  ${index !== data?.episode_run_time.length - 1 ? ',\xa0' : ''}`
                        : `\xa0${item}min${
                            index !== data?.episode_run_time.length - 1
                              ? ',\xa0'
                              : ''
                          }`
                    )}
                </p>
              ) : null}
            </div>
            {data?.number_of_seasons && data?.number_of_episodes && (
              <p className="flex flex-row">
                {data?.number_of_seasons} seasons,&nbsp;
                {data?.number_of_episodes} episodes
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap">
              {mainCast?.map((item, index) => (
                <Link key={index} href={`/name/${item.id}`} passHref>
                  <p className="hover:font-bold hover:cursor-pointer">
                    {item.name}
                    {index !== mainCast?.length - 1 ? ',\xa0' : null}
                  </p>
                </Link>
              ))}
            </div>
            <div className="flex flex-row flex-wrap">
              {data?.release_date && <p>Directed by:</p>}
              {data?.release_date && !director ? (
                '\xa0-'
              ) : (
                <Link href={`/name/${directorID}`} passHref>
                  <p className="hover:font-bold hover:cursor-pointer">
                    &nbsp;{!data?.first_air_date && director}
                  </p>
                </Link>
              )}
            </div>
            <div className="flex flex-row flex-wrap">
              {data?.first_air_date && <p>Created by:&nbsp;</p>}
              {data?.created_by?.length === 0 && '\xa0-'}
              {data?.first_air_date &&
                data?.created_by.length > 0 &&
                data?.created_by.map((item, index) => (
                  <Link key={index} href={`/name/${item.id}`} passHref>
                    <p className="hover:font-bold hover:cursor-pointer">
                      {item.name}
                      {index !== data?.created_by.length - 1 ? ',\xa0' : null}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row flex-wrap">
              {genres?.map((item, index) => (
                <p key={index}>
                  {item.name === 'Talk' ? 'Talk Show' : item.name}
                  {index !== genres?.length - 1 ? ',\xa0' : null}
                </p>
              ))}
            </div>
            <div>
              Rating:{' '}
              {!data.vote_average
                ? '-'
                : `${Math.round(data?.vote_average * 10)}%`}
            </div>
            <div>
              {data.release_date && <p>Rated: {!rating ? '-' : rating}</p>}
            </div>
          </div>
        </section>
        <Poster path={data?.poster_path} />
      </div>
      <nav
        className={`flex flex-row justify-between w-full buttonMenuPos h-auto divide-x divide-white border-2
           border-white`}
      >
        <button
          type="button"
          onClick={() => {
            setIsShowVideo((previsShowVideo) => !previsShowVideo);
            setIsShowInfo(false);
            setIsShowCast(false);
          }}
          className="bg-transparent w-full active:bg-white active:text-black hover:font-bold p-2
             text-white"
        >
          Play Trailer
        </button>
        <button
          type="button"
          onClick={() => {
            setIsShowInfo((previsShowInfo) => !previsShowInfo);
            setIsShowVideo(false);
            setIsShowCast(false);
          }}
          className="bg-transparent w-full  active:bg-white active:text-black hover:font-bold p-2
             text-white"
        >
          Info
        </button>
        <button
          className="bg-transparent w-full  active:bg-white active:text-black hover:font-bold p-2 text-white"
          type="button"
          onClick={() => {
            setIsShowCast((previsShowCast) => !previsShowCast);
            setIsShowVideo(false);
            setIsShowInfo(false);
          }}
        >
          Cast & Crew
        </button>
      </nav>
      <div className="relative">
        {isShowVideo ? (
          <Video videos={data?.videos?.results} />
        ) : isShowInfo ? (
          <Info info={data?.overview} />
        ) : isShowCast ? (
          <Credits credits={data?.credits} type="title" />
        ) : null}
      </div>
    </div>
  );
};

Title.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps({ params }) {
  let data = await getData(`${params.media_type}`, `${params.id}`, API_OPTIONS);
  if (data.error) data.error = true;
  return { props: data };
}

export default Title;
