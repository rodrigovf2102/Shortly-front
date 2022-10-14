import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

export default function TopBar({page}){

    const [enterColor,setSignInColor] = useState();
    const [signUpColor,setSignUpColor] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        if(page==='signin'){
            setSignInColor('green');
            setSignUpColor('gray');
        } else{
            setSignInColor('gray');
            setSignUpColor('green');     
        }
    }
    ,[])

    function navigateToLogin(){
        navigate('/signin');
    }
    function navigateToSignup(){
        navigate('/signup');
    }

    return(
        <Bar>
            <Enter color={enterColor} onClick={navigateToLogin}>Enter</Enter>
            <Signup color={signUpColor} onClick={navigateToSignup}>Signup</Signup>
        </Bar>
    )
}

const Bar = styled.div`
    width: 100%;
    height: 70px;
    background-color: wheat;
    display: flex;
    justify-content: end;
`
const Enter = styled.div`
    margin: 24px;
    color:${props=>props.color};
    font-weight: 700;
    font-size: 14px;

`
const Signup = styled.div`
    margin: 24px;
    color:${props=>props.color};
    font-weight: 700;
    font-size: 14px;
`