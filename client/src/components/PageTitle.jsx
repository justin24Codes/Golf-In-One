

const PageTitle = ({title = 'Golf In One'}) => {

    return (
        <div className='w-full h-24 flex items-end justify-center mt-16'>
            <h1 className='text-3xl font-semibold'>{title}</h1>
        </div>
    )
};

export default PageTitle;