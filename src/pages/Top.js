import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

export default function TopBar({ username, page }) {
    const [enterColor, setSignInColor] = useState();
    const [signUpColor, setSignUpColor] = useState();
    const [rankingColor, setRankingColor] = useState('gray');

    const navigate = useNavigate();

    useEffect(() => {
        if (page === 'signin') {
            setSignInColor('green');
            setSignUpColor('gray');
        } else {
            setSignInColor('gray');
            setSignUpColor('green');
        }
    }
        , [])

    function navigateToLogin() {
        navigate('/signin');
    }
    function navigateToSignup() {
        navigate('/signup');
    }
    function navigateToRanking() {
        navigate('/ranking');
    }
    function navigateToHome() {
        navigate('/');
    }

    if (page === 'signin' || page === 'signup') {
        return (
            <Bar>
                <Enter color={enterColor} onClick={navigateToLogin}>Enter</Enter>
                <Signup color={signUpColor} onClick={navigateToSignup}>Signup</Signup>
            </Bar>
        )
    }
    if (page === 'homepage' || page === 'ranking') {
        return (
            <HomeBar>
                <GreetingsMessage>Welcome, {username}</GreetingsMessage>
                <div>
                    <Enter color={rankingColor} onClick={navigateToHome}>Home</Enter>
                    <Enter color={rankingColor} onClick={navigateToRanking}>Ranking</Enter>
                    <Signup color={rankingColor} onClick={navigateToLogin}>Sair</Signup>
                </div>
            </HomeBar>
        )
    }
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
    color:${props => props.color};
    font-weight: 700;
    font-size: 14px;

`
const Signup = styled.div`
    margin: 24px;
    color:${props => props.color};
    font-weight: 700;
    font-size: 14px;
`
const HomeBar = styled.div`
    width: 100%;
    height: 70px;
    background-color: wheat;
    display: flex;
    justify-content: space-between;
    div{
        display: flex;
    }
`
const GreetingsMessage = styled.div`
    margin: 24px;
    color:green;
    font-weight: 700;
    font-size: 14px;
`