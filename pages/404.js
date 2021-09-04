import Layout from '../components/Layout'

const Custom404 = () =>{

     return (
    <div className="lg:ml-menu lg:w-main w-full lg:text-2xl pt-32 px-4 lg:pt-44 2xl:text-3xl text-center">
       <p> 404 - Page not found</p>
    </div>
    )       
}

Custom404.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }

export default Custom404