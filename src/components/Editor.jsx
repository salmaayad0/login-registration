import { Link } from "react-router-dom"
import * as STYLE from "../styles/Style"

const Editor = () => {
    return (
        <section className={STYLE.SEC_STYLE}>
            <h1 className={STYLE.H1_STYLE}>Editors Page</h1>
            <p className={STYLE.TEXT_STYLE}>You must have been assigned an Editor role.</p>
            <div className={STYLE.LINK_STYLE}>
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor