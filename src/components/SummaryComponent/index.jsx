
import './index.css'


const SummaryComponent = props => {

    const {keyValue, propValue} = props

    const aboutService = {
        service: "SERVICE",
        yourReferrals: "YOUR REFERRALS",
        activeReferrals: "ACTIVE REFERRALS",
        totalRefEarnings: "TOTAL REF. EARNINGS"
    }

    return (
        <li className="summary-list-item">

            <div className="summary-item">

                <h1 className="summary-label">
                    {aboutService[keyValue]}
                </h1>

                <p
                    className={
                        keyValue === "service"
                            ? "summary-value service-value"
                            : "summary-value"
                    }
                >
                    {propValue}
                </p>

            </div>

        </li>
    )
}

export default SummaryComponent