import "./index.css"

const Footer = () => {

    return (

        <footer className="footer-container">

            <h1 className="footer-logo">
                Go Business
            </h1>

            <nav
                className="footer-nav"
                aria-label="Footer"
            >

                <a href="#">
                    About
                </a>

                <a href="#">
                    Contact
                </a>

                <a href="#">
                    Privacy
                </a>

                <a href="#">
                    Terms
                </a>

            </nav>

            <p className="footer-copy">

                © 2024 Go Business, Inc.

            </p>

        </footer>

    )

}

export default Footer