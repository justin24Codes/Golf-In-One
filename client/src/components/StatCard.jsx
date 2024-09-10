const StatCard = ({ label, value }) => {
  return (
    <div className='flex flex-col mb-6 hover:text-golf'>
      <div className="hover:shadow-golf bg-stone-200 w-56 h-56 mt-6 mx-12 rounded-2xl flex items-center justify-center shadow-lg drop-shadow-md">
        <p className='text-golf text-7xl font-medium'>{value}</p>
      </div>
      <h2 className='flex self-center mt-2 text-xl font-semibold'>{label}</h2>
    </div>
  );
};

export default StatCard;
