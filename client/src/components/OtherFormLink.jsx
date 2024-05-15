import { Link } from "react-router-dom";


const OtherFormLink = ({text}) => {
    return (
        <Link to='/login'>
            <p>{text}</p>
        </Link>
    )
};

export default OtherFormLink