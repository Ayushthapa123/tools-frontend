"use client"

import React, { FC } from 'react'

interface IProps {
    label: string
}

export const CustomChip: FC<IProps> = (props) => {
    const { label } = props
    return (
        <div>
            <span className="badge badge-neutral rounded-full text-[8px] md:text-base">
                {label}
            </span>
        </div>
    )
}
