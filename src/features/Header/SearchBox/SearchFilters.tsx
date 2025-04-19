"use client"
import { useState } from 'react';
import WaveBackground from './SvgBackground';
import { FaPeopleArrows } from 'react-icons/fa6';
import { GiDuration } from 'react-icons/gi';
import { FaPersonShelter } from 'react-icons/fa6';
import { FaBed } from 'react-icons/fa';

export const SearchFilters = () => {
  const [gender,setGender]=useState("")
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [room, setRoom] = useState('');



  const filters = [
    { name: 'gender', options: ['boys', 'girls'], icon: <div><FaPeopleArrows/></div> },
    // { name: 'type', options: ['student', 'traveller','pg], icon: <div><FaPersonShelter/></div> },
    { name: 'duration', options: ['monthly', 'daily'], icon: <div><GiDuration/></div> },
    { name: 'room', options: ['1bed', '2bed', '3bed', '4bed', '5bed'], icon: <div><FaBed/></div> },

    //pricing filter will be done in frontend after pull
  ];
  return (
    <div className=" relative mt-8 min-h-20 w-full ">
      <div className="  w-full h-auto absolute top-0 left-0 z-0 ">
        {/* <WaveBackground /> */}
      </div>
      <div className=" mx-auto flex w-full max-w-5xl flex-wrap  items-center justify-center gap-3 ">
        {filters.map(item => (
          <div key={item.name} className=" flex  items-center gap-5 ">
            {item.options.map(option => (
              <div
                key={option}
                className=" flex relative w-auto cursor-pointer items-center   rounded-lg border-[3px] border-white bg-dark p-3 px-9 font-semibold text-white  hover:bg-primary">
                <div className=" text-blue-600"># </div>
                {option}
                <div className=' absolute left-[-10px] bottom-[-10px] text-secondary text-[25px]'>{item.icon}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
