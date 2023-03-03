import React from 'react'
import { useSelector } from 'react-redux'


const Genres = ({ data }) => {

  const { genres } = useSelector((state) => state.home);



  return (
    <div className='absolute flex bottom-0 right-0 gap-1 text-white w-24  justify-end m-1'>
      {data?.map((genre,i) => {
        if (!genres[genre]?.name) return;
        return (
          <div key={i} className='bg-pink-600 text-[8px] whitespace-nowrap p-[1px] px-[3px] rounded-lg max-w-[45px] truncate'>
            {genres?.[genre]?.name}
          </div>
        )
      })}
    </div>
  )
}

export default Genres