import React from 'react';
import LoadingIcon from '../assets/logo/three-dots.svg'
import {usePromiseTracker} from 'react-promise-tracker';
import Image from "next/legacy/image";


const LoadingIndicator = (props) => {
    
    const { promiseInProgress } = usePromiseTracker();

    return  promiseInProgress&&<Image aria-label="Searching for terms" src={LoadingIcon} alt="Loading animation"/>
}


export default LoadingIndicator
