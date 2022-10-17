import styled from 'styled-components';
import shortlyImg from '../assets/images/Vector.png';
import { useState, useContext } from "react";
import { Grid } from 'react-loader-spinner';
import { postLogin } from '../services/Shortly.js';
import UserContext from '../context/UserContext';
import TopBar from './Top';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
    const [disableForm, setDisableForm] = useState(false);
    const { tasks, setTasks } = useContext(UserContext);
    const [login, setLogin] = useState({ email: "", password: "" });
    const [corEntrar, setCorEntrar] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function loginInfo(event) {
        event.preventDefault();
    }

    async function userLogin() {
        setCorEntrar(0.6);
        setDisableForm(true);
        try {
            const token = await postLogin(login);
            autorizado(token);
        } catch (error) {
            unautorized(error);
        }
    }

    function unautorized(error) {
        console.log(error)
        if (error.message === 'Network Error') {
            setErrorMessage(error.message)
        } else {
            setErrorMessage(error.response.data)
        }

        setCorEntrar(1);
        setDisableForm(false);
    }

    function autorizado(token) {
        const tokenAuthorization = {
            headers: {
                "Authorization": `Bearer ${token.data.token}`
            }
        }
        setTasks(tokenAuthorization);
        setDisableForm(false);
        setCorEntrar(1);
        navigate('/');    
    }

    return (
        <Container>
            <TopBar page={'signin'}/>
            <Page>
                <Form onSubmit={loginInfo}>
                    <Input type="text" placeholder=' E-mail' onChange={event => setLogin({ ...login, email: event.target.value })}
                        disabled={disableForm} required />
                    <Input type="password" placeholder=' Senha' onChange={event => setLogin({ ...login, password: event.target.value })}
                        disabled={disableForm} required />
                    {typeof errorMessage !== 'string' ? errorMessage.map((msg) => <ErrorMessage>{msg}</ErrorMessage>) :
                        <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <Entrar cor={corEntrar} onClick={userLogin} disabled={disableForm} type="submit">
                        {disableForm ? <Grid color='white' radius="8" heigth="100" /> : "Entrar"}
                    </Entrar>
                </Form>
            </Page>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    overflow-y: hidden;
`
const Page = styled.div`
    background-color: beige;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    `
const Title = styled.div`
    font-size: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

`
const Input = styled.input`
        margin-top: 10px;
        width: 50%;
        height: 50px;
        border-radius: 10px;
        border: 1px solid rgba(120,170,90,0.25);
        box-shadow: 0px 4px 24px rgba(120,180,90,0.15);
`

const Entrar = styled.div`
    margin-top: 15px;
    width: 180px;
    height: 50px;
    border-radius: 12px;
    background-color: #5D9040;
    opacity: ${props=>props.corEntrar};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
`

const ErrorMessage = styled.div`
    margin-top: 20px;
    color: red;
`

export {Container,Page,Title,Form,Input,Entrar,ErrorMessage}