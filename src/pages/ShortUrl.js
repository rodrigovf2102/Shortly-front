import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { redirectUrl } from "../services/Shortly.js";
import styled from 'styled-components';

export default function ShortUrl() {
    const { shortUrl: shortUrl } = useParams();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        const promisse = redirectUrl(shortUrl);
        promisse.then(authorized);
        promisse.catch(unauthorized);
    }, [])

    function authorized(response) {
        console.log(response.data)
    }

    function unauthorized(error) {
        if(error.response){
            setErrorMessage(error.response.data);
        } else{
            setErrorMessage(error.message);
        }
        
    }

    return (

            <Redirect>      
                {errorMessage ? <div>{errorMessage}</div> : <>Redirecting...</>}
            </Redirect>
            

    )
}

            const Redirect = styled.div`
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 35px;
            font-weight: 700;
            background-color: rgba(210,210,210,1);
            `