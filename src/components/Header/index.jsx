import {Link,useNavigate} from 'react-router-dom'
import './index.css'
import Cookies from "js-cookie";

const Header = () =>{

    const Navigate = useNavigate()
    

    const logoutBtn = () =>{
        const jwtToke = Cookies.remove("jwt_token")
        Navigate("/login",{replace:true})
    }
    
    return(
        
        <nav className='navbar'>
            <Link to="/" className='nav-Link'><h1 className='logo'>Go Bussiness</h1></Link>
            <div className='nav-buttons'>
                <button type="buttton" className='free-btn'>Try for free</button>
                <button type="button" className='logout-btn' onClick={logoutBtn}>Logout</button>
            </div>

            
        </nav>
        
    )
}

export default Header

