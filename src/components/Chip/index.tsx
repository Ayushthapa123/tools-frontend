"use client"

import { Chip } from '@material-tailwind/react';
import React, { FC } from 'react'

interface IProps {
    label:string
}


export const CustomChip:FC<IProps> = (props) => {
    const {label}=props
  return (
    <div>
      <Chip value={label}  className="rounded-full text-[8px] md:text-base" />
    </div>
  );
 }
