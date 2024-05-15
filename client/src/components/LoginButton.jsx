import { Link } from "react-router-dom";

const LoginButton = () => {

    return (
        <div>
            <Link to='/login' className='flex text-white bg-golf shadow-lg font-noto-sans font-semibold text-lg w-24 h-10 border-2 border-golf rounded-2xl justify-center transition-none hover:brightness-125'>
                <button>Login</button>
            </Link>
        </div>
    )
}

export default LoginButton;