import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function HomePage(){
    const navigate = useNavigate();

    function goTosigninPage(){
        navigate('/signin')
    }
    
    return(
        <>
        Home
            <NavigateToLogin onClick={goTosigninPage}>Create you account to use our service!</NavigateToLogin>
        </>
    )
}

const NavigateToLogin = styled.div`

`
