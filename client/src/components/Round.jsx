

const Round = ({course, holes, tees, score}) => {
    return (
        <div className='bg-slate-100 w-11/12 h-24 my-2 rounded-xl flex flex-row justify-between items-center px-6'>
            <p className='text-black font-semibold text-5xl'>{score}</p>
        </div>
    )
};

export default Round;