import Layout from '../components/Layout'

const Custom500 = () =>{

     return (
    <div className="lg:ml-menu lg:w-main w-full lg:text-2xl pt-32 px-4 lg:pt-44 2xl:text-3xl text-center">
       <p> 500 - Server-side error occurred</p>
    </div>
    )       
}

Custom500.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }

export default Custom500