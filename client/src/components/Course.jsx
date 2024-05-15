const Course = ({ name, par, tees, imageUrl}) => {
  return (
    <div className="bg-[#d2d7df] w-60 h-72 mx-4 my-8 rounded-2xl shadow-xl hover:text-golf group relative hover:shadow-sm hover:shadow-golf">
      <div className='overflow-hidden rounded-2xl'>
        <img
          src={imageUrl}
          className="object-cover w-full h-72 rounded-2xl group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <p className="text-sm font-semibold text-center pt-2 transition-all duration-300">{name}</p>
      <div className="group-hover:block w-full h-full rounded-2xl top-0 absolute bg-black transition-opacity duration-300 opacity-0 group-hover:opacity-50 py-4 px-3">
        {/* {tees.map((tee) => (<p className='text-white text-sm' key={tee._id}>{tee.allInfo}</p>))} */}
      </div>
      <div className='w-full h-full top-0 rounded-2xl absolute group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 py-4 px-3'>
      {tees.map((tee) => (<p className='text-white text-sm z-50' key={tee._id}>{tee.allInfo}</p>))}
      </div>
    </div>
  );
};

export default Course;
