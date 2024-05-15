

const FormSubmitButton = ({label = 'Create Account'}) => {

    const submit = () => {

    };

    return (
        <button type='submit' onClick={submit} className='bg-golf shadow-md shadow-gray-400 w-60 sm:w-80 h-12 rounded-2xl hover:brightness-75 transition duration-300 active:-translate-y-1'>
            <p className='text-white'>{label}</p>
        </button>
    )
};

export default FormSubmitButton;