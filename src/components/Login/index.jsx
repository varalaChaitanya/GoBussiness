
import Cookies from 'js-cookie'
import {useState} from 'react'

import {useNavigate,Navigate} from 'react-router-dom'

import './index.css'

const Login = () =>{

    const navigate=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassWord]=useState('')
    const [isError,setIsError]=useState(false)
    const [errorMsg,setError]=useState('')


    const userEmail = (event) =>{
        setEmail(event.target.value)
    }

    const userPassword = (event) =>{
        setPassWord(event.target.value)
    }

    const onSubmitSuccess = (JwtToken) =>{

        Cookies.set("jwt_token",JwtToken,{expires:30});

        navigate("/",{replace:true})
    }

    const onSubmitFailure = (errorMsg) =>{

        setIsError(true)
        setError(errorMsg)

    }

    const signin = async (event) =>{
        event.preventDefault();

        const userCredentials = {email,password};

        const options = {
            method:"POST",
            headers:{
            "Content-Type":'application/json',
        },
            body:JSON.stringify(userCredentials),
        }
        const apiUrl =
`${import.meta.env.VITE_API_URL}/api/auth/signin`
        const response = await fetch(apiUrl,options);

        const responseJson = await response.json();

        if (response.ok){
            onSubmitSuccess(responseJson.data.token)
        }
        else{
            onSubmitFailure(responseJson.message)
        }

        

    }

    const token = Cookies.get("jwt_token");

    if (token!==undefined) {
    
        return <Navigate to="/" />;
    }
    

    return(

        <div className='loginContainer'>
           
            <div className='formContainer'>
                <h1 className='main-heading'>Go Business</h1>
                <p className='about-web'>Sign in to open your referral dashboard.</p>
                <form onSubmit={signin}>
                    <div>
                        <label htmlFor='EmailInput' className='labelText'>Email:</label>
                        <input type="email" className='emailInput' value={email} id="EmailInput" onChange={userEmail} required/>
                    </div>
                    <div>
                        <label htmlFor='passInput' className='labelText'>Password:</label>
                        <input type="password" className='emailInput' value={password} id="passInput" onChange={userPassword} required/>
                        
                    </div>
                    <button type="submit" className='signBtn'>Sign In</button>
                    {isError && <p className='errorMsg'>{errorMsg}</p>}
                </form>

            </div>

        </div>
    )


}

export default Login