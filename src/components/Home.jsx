import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import * as STYLE from "../styles/Style"

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <section className={STYLE.SEC_STYLE}>
            <h1 className={STYLE.H1_STYLE}>Home</h1>

            <p className={STYLE.TEXT_STYLE}>You are logged in!</p>

            <Link to="/editor" className={STYLE.LINK_STYLE}>Go to the Editor page</Link>
     
            <Link to="/admin" className={STYLE.LINK_STYLE}>Go to the Admin page</Link>
        
            <Link to="/lounge" className={STYLE.LINK_STYLE}>Go to the Lounge</Link>
         
            <Link to="/linkpage" className={STYLE.LINK_STYLE}>Go to the link page</Link>

            <div className={STYLE.LINK_STYLE}>
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home