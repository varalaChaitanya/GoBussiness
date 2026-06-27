import {useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import "./index.css"

const ROWS_PER_PAGE = 10

const AllReferrals = props => {

    const {referrals, loading} = props

    const [currentPage, setCurrentPage] = useState(1)

    const navigate=useNavigate();

    useEffect(() => {
        setCurrentPage(1)
    }, [referrals])

    if (loading) {
        return (
            <div className="loader-container">
                <h2>Loading...</h2>
            </div>
        )
    }

    if (referrals.length === 0) {
        return (
            <div className="loader-container">
                <h2>No Referrals Found</h2>
            </div>
        )
    }

    const totalPages = Math.ceil(referrals.length / ROWS_PER_PAGE)

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE

    const endIndex = startIndex + ROWS_PER_PAGE

    const currentRows = referrals.slice(startIndex, endIndex)

    const previousPage = () => {

        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }

    }

    const nextPage = () => {

        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }

    }

    return (

        <div className="table-card">

            <table className="referral-table">

                <thead>

                    <tr>

                        <th>NAME</th>

                        <th>SERVICE</th>

                        <th>DATE</th>

                        <th>PROFIT</th>

                    </tr>

                </thead>

                <tbody>

                    {currentRows.map(eachReferral => (

                        <tr key={eachReferral.id} className="table-row" onClick={()=>navigate(`referrals/${eachReferral.id}`)}>

                            <td className="name-column">

                                {eachReferral.name}

                            </td>

                            <td>

                                {eachReferral.serviceName}

                            </td>

                            <td>

                                {eachReferral.date}

                            </td>

                            <td className="profit-column">

                                ₹ {eachReferral.profit.toLocaleString()}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="pagination-container">

                <p className="entries-text">

                    Showing

                    {" "}

                    {startIndex + 1}

                    -

                    {Math.min(endIndex, referrals.length)}

                    {" "}of{" "}

                    {referrals.length}

                    {" "}entries

                </p>

                <div className="pagination">

                    <button
                        className="page-btn"
                        disabled={currentPage === 1}
                        onClick={previousPage}
                    >
                        Previous
                    </button>

                    {

                        Array.from(
                            {length: totalPages},
                            (_, index) => (

                                <button

                                    key={index}

                                    className={
                                        currentPage === index + 1
                                            ? "page-number active-page"
                                            : "page-number"
                                    }

                                    onClick={() =>
                                        setCurrentPage(index + 1)
                                    }

                                >

                                    {index + 1}

                                </button>

                            )
                        )

                    }

                    <button
                        className="page-btn"
                        disabled={currentPage === totalPages}
                        onClick={nextPage}
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    )

}

export default AllReferrals