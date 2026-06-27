

import {useState,useEffect} from 'react';
import React, { useRef } from "react";
import Cookies from 'js-cookie';
import Overview from '../Overview'
import SummaryComponent from '../SummaryComponent'
import PaginationHeader from '../PaginationHeader';
import AllReferrals from '../Allreferrals'
import Footer from '../Footer'
import './index.css'

import Header from '../Header'

const Home = () =>{

    const [isLoading,setLoading]=useState(true)
    const [metrics,setMetrics]=useState([])
    const [serviceSummary,setServiceSummary]=useState({})
    const [referral,setReferral]=useState({})
    const [referrals,setReferrals]=useState([])
    const [, setCrash] = useState(); 
    const [showPopup, setShowPopup] = useState(false);
    const [showpopCode,setShowCode]=useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("desc")
    const jwtToken = Cookies.get("jwt_token");

    const paragraphRef = useRef(null);
    const codeRef = useRef(null);

    useEffect(() => {

    const timerId = setTimeout(() => {

        setDebouncedSearch(search)

    }, 300)

    return () => clearTimeout(timerId)

}, [search])

    const copyVisibleText = async () => {
    // 2. Access the actual <p> element and grab what the user sees
    if (paragraphRef.current) {
      const visibleText = paragraphRef.current.innerText; 

      try {
        // 3. Send that exact text to the clipboard
        await navigator.clipboard.writeText(visibleText);
        
        // 4. Trigger the top popup notification
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000); // Hides after 2 seconds
      } catch (err) {
        console.error("Could not copy text: ", err);
      }
    }
  };

  const copyVisibleCode = async () => {
    // 2. Access the actual <p> element and grab what the user sees
    if (codeRef.current) {
      const visibleText = codeRef.current.innerText; 

      try {
        // 3. Send that exact text to the clipboard
        await navigator.clipboard.writeText(visibleText);
        
        // 4. Trigger the top popup notification
        setShowCode(true);
        setTimeout(() => setShowCode(false), 2000); // Hides after 2 seconds
      } catch (err) {
        console.error("Could not copy text: ", err);
      }
    }
  };


    useEffect(()=>{
        const getMetrics = async () =>{

            const apiUrl =
`${import.meta.env.VITE_API_URL}/api/referrals`
            const options = {
                method:"GET",
                headers:{
                    "Content-Type":'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            try{

            const response = await fetch(apiUrl,options)

            const dataJson = await response.json();

            const allMetrics = dataJson.data.metrics.map((eachMetric)=>({
                id:eachMetric.id,
                label:eachMetric.label,
                value:eachMetric.value,
            }));
            

            setMetrics(allMetrics)
            
            const allserviceSummary = dataJson.data.serviceSummary
            setServiceSummary(allserviceSummary)

            const theReferral = dataJson.data.referral
            setReferral(theReferral)

            setLoading(false)
        }
        catch(err){
             setCrash(() => { throw err; }); 
        }

        };

        getMetrics();

},[])


     useEffect(()=>{
        const getReferrals = async ()=>{

        

       let url =
`${import.meta.env.VITE_API_URL}/api/referrals`

        

 
        const query = []

if (debouncedSearch !== "") {
    query.push(
        `search=${encodeURIComponent(debouncedSearch)}`
    )
}

if (sort !== "") {
    query.push(`sort=${sort}`)
}



if (query.length > 0) {
    url = `${url}?${query.join("&")}`
}



        const options = {
                method:"GET",
                headers:{
                    "Content-Type":'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

        const response = await fetch(url,options)

        const data = await response.json()

        if(response.ok){

            setReferrals(data.data.referrals)

        }

        setLoading(false)

    }

    getReferrals();


        
     },[debouncedSearch,sort])










    const overviewComponent = () =>(
        <div className='overview-card'>
                <h1 className='overview-heading'>Overview</h1>
                <ul className='overview-list'>
                    {metrics.map(eachMetric=><Overview key={eachMetric.id} eachMetric={eachMetric}/>)}

                </ul>
            </div>
    )

    const serviceSummaryComponent = () =>(
        <div className='service-card'>
                <h1 className='service-heading'>Service Summary</h1>
                <ul className='service-list'>
                    {Object.entries(serviceSummary).map(([key, value]) => (
    <SummaryComponent
        key={key}
        keyValue={key}
        propValue={value}
    />
))}

                </ul>
            </div>
    )

    const referralSection = () =>(
        <div className='referalContainer'>
            <h1 className='referralHeading'>Refer friends and earn more</h1>
            <div className='ReferealLinkContainer'>
                <div>
                    <p className='aboutLink'>YOUR REFERRAL LINK</p>
                    <div className='LinkBox'>
                        <div className='LinkContainer'>
                       
                    
                            {showPopup && 
                                (<div className='popupStyle'>
                                           Copied successfully! 👍
                                </div>)
                            }

                            <p ref={paragraphRef}>
                                {referral.link}
                            </p>
                    

                        </div>
                        <button onClick={copyVisibleText} className='btnStyle'>
                                Copy
                        </button>
                    </div>
                </div>
                <div>
                   
                    <p className='aboutLink'>YOUR REFERRAL CODE</p>
               <div className='CodeBox'>     
                <div className='CodeContainer'>

                    
                        {showpopCode && 
                              (<div className='popupStyle'>
                                           Copied successfully! 👍
                                </div>)
                         }

                    <p ref={codeRef}>
                         {referral.code}
                    </p>
                    

                </div>
                <button onClick={copyVisibleCode} className='btnStyle'>
                        Copy
                      </button>
                </div>


            </div>


            </div>

        </div>
    )

    const PaginationSection = () =>(
        <>
        <div className='referrals-card'>
            <PaginationHeader

                search={search}

                sort={sort}

                onChangeSearch={setSearch}

                onChangeSort={setSort}

            />

            <AllReferrals

                referrals={referrals}

                loading={isLoading}

            />
        </div>
        </>

    )

    return(
        <div className='Main-Container'>
            <Header/>
            <div className='dashboard-heading'>
            <h1 className='Main-heading'>Referral Dashboard</h1>
            <p className='description'>Track Your referrals, earnings, and partner activity in one place.</p>
            </div>
            {isLoading && (<div className='LoadingContainer'><p className='loadingMesg'>Loading dashboard...</p></div>)}

            {!isLoading && (overviewComponent())}
            {!isLoading && (serviceSummaryComponent())}
            {!isLoading && (referralSection())}
            {!isLoading && (PaginationSection())}


            <Footer/>

        </div>
    )
}

export default Home



