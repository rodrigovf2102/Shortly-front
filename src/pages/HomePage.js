import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import trophy from '../assets/images/trofeu.png'
import { Title, Container } from './LoginPage.js';
import shortlyImg from '../assets/images/Vector.png';
import TopBar from './Top.js';
import { getRanking, postUrl, getUserUrls, deleteUrl } from '../services/Shortly.js';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Grid } from 'react-loader-spinner';

export default function HomePage() {
    const navigate = useNavigate();
    const [ranking, setRanking] = useState([]);
    const { tasks, setTasks } = useContext(UserContext);
    const [link, setLink] = useState({ url: "" });
    const [sendUrlColor, setSendUrlColor] = useState(1);
    const [disableForm, setDisableForm] = useState(false);
    const [usersUrls,setUsersUrls] = useState();
    const [userName,setUserName] = useState('user');

    function goTosignupPage() {
        navigate('/signup')
    }

    function urlInfo(event) {
        event.preventDefault();
    }

    useEffect(() => {
        const promisse = getRanking();
        promisse.then(autorized);
        promisse.catch(unautorized);
    }, [])

    useEffect(()=>{
        if(tasks){
            const promisse = getUserUrls(tasks);
            promisse.then(autorizedGetUrls);
            promisse.catch(unautorized);
        }
    },[])

    function autorizedGetUrls(response){
        setUsersUrls(response.data.shortenedUrls);
        setUserName(response.data.name);
    }
    function unautorized(error) {
        alert(error.message);
    }

    function autorized(response) {
        setRanking(response.data);
    }

    function getUrls(){
        const promisse = getUserUrls(tasks);
        promisse.then(autorizedGetUrls);
        promisse.catch(unautorized);
    }

    async function postLink() {
        const token = tasks;
        try {
            const response = await postUrl(token, link);
            getUrls();
        } catch (error) {
            alert(error.message)
        }
    }

    async function deleteLink(index){
        const id = usersUrls[index].id;
        try {
            const response = await deleteUrl(tasks,id);
            getUrls();
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        !tasks ?
            <Container>
                <TopBar username={userName} page={'signin'} />
                <Page>
                    <Title>Shortly<img src={shortlyImg} /></Title>
                    <TitleRank><img src={trophy} />Ranking</TitleRank>
                    <Ranking>{
                        ranking.map(
                            (rank, index) => (
                                <User>
                                    {index + 1}. {rank.name} - {rank.linksCount} links - {rank.visitCount} views
                                </User>)
                        )}
                    </Ranking>
                    <NavigateToLogin onClick={goTosignupPage}>Create you account to use our service!</NavigateToLogin>
                </Page>
            </Container>
            :
            <Container>
                <TopBar username={userName} page={'homepage'} />
                <Page>
                    <Title>Shortly<img src={shortlyImg} /></Title>
                    <Form onSubmit={urlInfo}>
                        <Input type="text" placeholder=' Links that fit your pocket' onChange={event => setLink({ ...link, url: event.target.value })}
                            disabled={disableForm} required />
                        <LinkButton cor={sendUrlColor} onClick={postLink} disabled={disableForm} type="submit">
                            {disableForm ? <Grid color='white' radius="8" heigth="100" /> : "Short Link"}
                        </LinkButton>
                    </Form>
                    <LinksContainer>
                        {usersUrls ? usersUrls.map(
                            (link,index)=>(<Links>
                            <Link>
                                <Url>{link.url}</Url> 
                                <div>{link.shortUrl} </div>
                                <div>Visitors count {link.visitCount}</div>
                            </Link>
                            <DeleteLink>
                                    <ion-icon onClick={()=>{deleteLink(index)}} name="trash-outline"></ion-icon>
                            </DeleteLink>
                        </Links>))
                        :<></>}
                    </LinksContainer>
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
const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 25px;
`
const Input = styled.input`
    width: 60%;
    height: 60px;
    border: 1px solid rgba(120,180,90,0.25);
    box-shadow: 0px 4px 24px rgba(120,180,90,0.15);
    border-radius: 12px;
    
`
const LinkButton = styled.div`
    margin-left: 25px;
    width: 182px;
    height: 60px;
    background-color: #5D9040;
    border-radius: 12px;
    color: white;
    display: flex;
    align-items:center;
    justify-content: center;
`
const LinksContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Link = styled.div`
    width: 70%;
    height: 60px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 12px 0px 0px 12px;
    background-color: #80cc74;
    color: white;
`
const DeleteLink = styled.div`
    margin-top: 30px;
    width: 5%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 12px 12px 0px;
    background-color: white;
    padding: 10px;
    ion-icon{
        color: red;
    }
`
const Links =styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`
const Url = styled.div`
    width: 25%;
    overflow-x: scroll;
`