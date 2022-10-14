import shortlyImg from '../assets/images/Vector.png';
import { useState} from "react";
import { Grid } from 'react-loader-spinner';
import { postSignup } from '../services/Shortly.js';
import TopBar from './Top';
import { Container,Page,Title,Form,Input,Entrar,ErrorMessage } from './LoginPage';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [disableForm, setDisableForm] = useState(false);
    const [signup, setSignup] = useState({name:"",email: "",password: "",confirmPassword:""});
    const [corEntrar, setCorEntrar] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function signupInfo(event) {
        event.preventDefault();
    }

    async function userSignup() {
        setCorEntrar(0.6);
        setDisableForm(true);
        try {
            const token = await postSignup(signup);
            autorizado(token);
        } catch (error) {
            unautorized(error);
        }
    }

    function unautorized(error) {
        if (error.message === 'Network Error') {
            setErrorMessage(error.message)
        } else {
            setErrorMessage(error.response.data)
        }

        setCorEntrar(1);
        setDisableForm(false);
    }

    function autorizado(data) {
        setDisableForm(false);
        setCorEntrar(1);
        navigate('/signin');    
    }

    return (
        <Container>
            <TopBar page={'signup'}/>
            <Page>
                <Title>Shortly<img src={shortlyImg} /></Title>
                <Form onSubmit={signupInfo}>
                <Input type="text" placeholder=' Name' onChange={event => setSignup({ ...signup, name: event.target.value })}
                        disabled={disableForm} required />
                    <Input type="text" placeholder=' E-mail' onChange={event => setSignup({ ...signup, email: event.target.value })}
                        disabled={disableForm} required />
                    <Input type="password" placeholder=' Password' onChange={event => setSignup({ ...signup, password: event.target.value })}
                        disabled={disableForm} required />
                    <Input type="password" placeholder=' Confirm Password' onChange={event => setSignup({ ...signup, confirmPassword: event.target.value })}
                        disabled={disableForm} required />
                    {typeof errorMessage !== 'string' ? errorMessage.map((msg) => <ErrorMessage>{msg}</ErrorMessage>) :
                        <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <Entrar cor={corEntrar} onClick={userSignup} disabled={disableForm} type="submit">
                        {disableForm ? <Grid color='white' radius="8" heigth="100" /> : "Entrar"}
                    </Entrar>
                </Form>
            </Page>
        </Container>
    )
}