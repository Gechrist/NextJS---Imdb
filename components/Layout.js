import React from "react";
import Header from "../components/Header";
import Footer from '../components/Footer';
import Head from 'next/head'

const Layout =({children}) => {
    return(
        <>
        <div>
        <Header/>
        <main> {children}</main>
        <Footer/>
        </div>
        </> 
    )

}

export default Layout;