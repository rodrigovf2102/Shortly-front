import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import trophy from '../assets/images/trofeu.png'
import { Title, Container } from './LoginPage.js';
import shortlyImg from '../assets/images/Vector.png';
import TopBar from './Top.js';
import { getRanking } from '../services/Shortly.js';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const navigate = useNavigate();
    const [ranking, setRanking] = useState([]);

    function goTosigninPage() {
        navigate('/signin')
    }

    useEffect(() => {
        const promisse = getRanking();
        promisse.then(autorized);
        promisse.catch(unautorized);
    }, [])

    function unautorized(error) {
        alert(error.message);
    }
    function autorized(response) {
        setRanking(response.data);
    }

    return (
        <Container>
            <TopBar page={'signin'} />
            <Page>
                <Title>Shortly<img src={shortlyImg} /></Title>
                <TitleRank><img src={trophy} />Ranking</TitleRank>
                <Ranking>{
                    ranking.map(
                        (rank, index) => ( 
                        <User>
                            {index+1}. {rank.name} - {rank.linksCount} links - {rank.visitCount} views
                        </User> )
                        )}
                </Ranking>
                <NavigateToLogin onClick={goTosigninPage}>Create you account to use our service!</NavigateToLogin>
            </Page>
        </Container>
    )
}

const NavigateToLogin = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 36px;
    font-weight: 700;
    margin-top: 75px;
`
const Ranking = styled.div`
    border: 1px solid rgba(120,180,90,0.25);
    box-shadow: 0px 4px 24px rgba(120,180,90,0.15);
    border-radius: 25px 25px 0px 0px;
    width: 75%;
    margin: 10px;
    padding: 10px;
`
const Page = styled.div`
    background-color: beige;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const TitleRank = styled.div`
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-top: 75px;
    margin-bottom: 75px;
`
const User = styled.div`
    font-size: 22px;
    font-weight: 700;
    margin: 5px;
`

