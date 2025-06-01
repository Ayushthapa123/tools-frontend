'use client';
import { useState } from 'react';
import WaveBackground from './SvgBackground';
import { FaPeopleArrows } from 'react-icons/fa6';
import { GiDuration } from 'react-icons/gi';
import { FaPersonShelter } from 'react-icons/fa6';
import { FaBed } from 'react-icons/fa';

export const SearchFilters = () => {
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [room, setRoom] = useState('');

  const filters = [
    {
      name: 'gender',
      options: ['boys', 'girls'],
      icon: (
        <div>
          <FaPeopleArrows />
        </div>
      ),
    },
    // { name: 'type', options: ['student', 'traveller','pg], icon: <div><FaPersonShelter/></div> },
    {
      name: 'duration',
      options: ['monthly', 'daily'],
      icon: (
        <div>
          <GiDuration />
        </div>
      ),
    },
    {
      name: 'room',
      options: ['1bed', '2bed', '3bed', '4bed', '5bed'],
      icon: (
        <div>
          <FaBed />
        </div>
      ),
    },

    //pricing filter will be done in frontend after pull
  ];
  return (
    <div className=" relative mt-8 min-h-20 w-full ">
      <div className="  absolute left-0 top-0 z-0 h-auto w-full ">{/* <WaveBackground /> */}</div>
      <div className=" mx-auto flex w-full max-w-5xl flex-wrap  items-center justify-center gap-3 ">
        {filters.map(item => (
          <div key={item.name} className=" flex  items-center gap-5 ">
            {item.options.map(option => (
              <div
                key={option}
                className=" bg-dark relative flex w-auto cursor-pointer   items-center rounded-lg border-[3px] border-white p-3 px-9 font-semibold text-white  hover:bg-primary"
              >
                <div className=" text-blue-600"># </div>
                {option}
                <div className=" absolute bottom-[-10px] left-[-10px] text-[25px] text-secondary">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
