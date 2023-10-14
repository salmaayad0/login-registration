import { Link } from "react-router-dom"
import Users from "./Users"
import * as STYLE from "../styles/Style"


const Admin = () => {
    return (
        <section className={STYLE.SEC_STYLE}>
            <h1 className={STYLE.H1_STYLE}>Admins Page</h1>
            <div>
                <Users />
            </div>
            <div className={STYLE.LINK_STYLE}>
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin