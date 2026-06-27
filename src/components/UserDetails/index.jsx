
import './index.css'


import { useNavigate,useParams,Link} from 'react-router-dom'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import { useState } from 'react'
import NotFound from'../NotFound'

const UserDetails = () =>{

    const {id}=useParams()
    const [isLoading,setLoading]=useState(true)
    const [RefDetails,setRef]=useState({})
    const [isFound,setFound]=useState(true)


    useEffect(()=>{

        const getDetails = async () =>{
        
            const apiUrl =
`${import.meta.env.VITE_API_URL}/api/referrals?id=${id}`
            const jwtToken = Cookies.get('jwt_token')

            const options = {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(apiUrl,options);
            const responseJson = await response.json();

            if(response.ok){
                setFound(true)
                const referral = responseJson.data.referrals[0]

                setRef(referral)
            }
            else{
                setFound(false)
            }
            console.log(responseJson)
            console.log(id)
        
            setLoading(false)



        }
        getDetails();

    },[])

    const ReferralDetails = () => {

        const {
    id,
    name,
    serviceName,
    date,
    profit
} = RefDetails

    if (!isFound) {
        return <NotFound />
    }

    return (
        <div className='Main'>
            <Link to="/">
                <p className="nav-link">
                    ← Back to dashboard
                </p>
            </Link>
            <div className="UserDetailsBox">

    <div className="userHeader">

        <h1 className="userName">

            {name}

        </h1>

        <span className="serviceBadge">

            {serviceName}

        </span>

    </div>

    <div className="detailRow">

        <p className="detailLabel">

            REFERRAL ID

        </p>

        <p className="detailValue">

            {id}

        </p>

    </div>

    <div className="detailRow">

        <p className="detailLabel">

            NAME

        </p>

        <p className="detailValue">

            {name}

        </p>

    </div>

    <div className="detailRow">

        <p className="detailLabel">

            SERVICE NAME

        </p>

        <p className="detailValue">

            {serviceName}

        </p>

    </div>

    <div className="detailRow">

        <p className="detailLabel">

            DATE

        </p>

        <p className="detailValue">

            {date}

        </p>

    </div>

    <div className="detailRow">

        <p className="detailLabel">

            PROFIT

        </p>

        <p className="detailValue">

            ${profit.toLocaleString()}

        </p>

    </div>

</div>

        </div>
    )
}



    const LoadingContainer = () =>(
        <div>
            <p>Data is Loadind</p>
        </div>

    )

    return(
        <>
        
            <Header/>

            {isLoading ? (LoadingContainer()) : (ReferralDetails())}
        </>
    )


}

export default UserDetails