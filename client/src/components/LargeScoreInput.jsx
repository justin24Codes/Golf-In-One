import { useState, useEffect } from "react";

const LargeScoreInput = ({ placeholder = 72, name, register, error, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <input
        className={`text-5xl text-center font-medium flex self-center outline-none bg-white border-gray-400 shadow-golf focus:shadow-md active:border-golf w-24 h-24 rounded-lg mb-1 border focus:border-golf ${
          error && 'border-2 border-red-600 active:border-red-600 focus:border-red-600'
        }`}
        defaultValue={placeholder.score}
        type="number"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...register(name, {required: true, min: 0})}
        {...props}
      />
      <div className='h-6'>
        {error && (
          <p className="text-red-600 text-xs flex self-center">
            Please enter a positive score
          </p>
        )}
      </div>
    </>
  );
};

export default LargeScoreInput;
