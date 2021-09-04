import Head from 'next/head'

const MetaTitle = ({title}) => {
    return (
        <>
        <Head>
        <title>{`NextJS Imdb ${title}`}</title>
        <meta property="og:title" title={`${title}`} key="title" />
        </Head>   
        </>
    )
}

export default MetaTitle
