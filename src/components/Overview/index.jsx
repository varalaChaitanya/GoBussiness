

import './index.css'


import {
  FaDollarSign,
  FaPercentage,
  FaLink,
  FaWallet,
  FaMoneyBillWave,
  FaUsers,
  FaUniversity
} from "react-icons/fa"

import {BsCreditCard2Front} from "react-icons/bs"

const iconMap = {
    "Total Balance": <FaDollarSign />,
    "Discount Percentage": <BsCreditCard2Front />,
    "Total Referral": <FaLink />,
    "Discount Amount": <FaMoneyBillWave />,
    "Commission Amount": <FaPercentage />,
    "Total Earning": <FaWallet />,
    "Commission Discount": <FaUsers />,
    "Total Bank Transfer": <FaUniversity />
}

const Overview = (props) =>{

    const {eachMetric}=props
    const {label,value}=eachMetric

    return(
       <li> 
        <div className="metric-card">
            <div className="icon-box">
    {iconMap[label]}
</div>
            <p className="metric-value">{value}</p>

            <h1 className='metric-label'>{label}</h1>
            

        </div>
        </li>
    )


}

export default Overview