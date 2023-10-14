import { useNavigate } from "react-router-dom";
import * as STYLE from "../styles/Style";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className={STYLE.SEC_STYLE}>
            <h1>Unauthorized</h1>
            <br />
            <p className={STYLE.TEXT_STYLE}>You do not have access to the requested page.</p>
            <div className={STYLE.LINK_STYLE}>
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized
