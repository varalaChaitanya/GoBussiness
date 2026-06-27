




import "./index.css";



const PaginationHeader = props => {

    const {
        search,
        sort,
        onChangeSearch,
        onChangeSort,
    } = props

    const searchChanged = event => {
        onChangeSearch(event.target.value)
    }

    const sortChanged = event => {
        onChangeSort(event.target.value)
    }

    return (

        <div className="header-container">

            <h1 className="heading">
                All referrals
            </h1>

            <div className="header-controls">

                <div className="search-container">

                    <label
                        htmlFor="search"
                        className="label"
                    >
                        Search
                    </label>

                    <input
                        id="search"
                        type="search"
                        className="search-input"
                        placeholder="Name or service..."
                        value={search}
                        onChange={searchChanged}
                    />

                </div>

                <div className="sort-container">

                    <label
                        htmlFor="sort"
                        className="label"
                    >
                        Sort by date
                    </label>

                    <select
                        id="sort"
                        className="sort-select"
                        value={sort}
                        onChange={sortChanged}
                    >

                        <option value="desc">
                            Newest first
                        </option>

                        <option value="asc">
                            Oldest first
                        </option>

                    </select>

                </div>

            </div>

        </div>

    )

}



export default PaginationHeader;