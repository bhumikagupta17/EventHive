import React from "react";
import {getInitials} from "../../utils/formatters.js"

export const Avatar=({
    name,
    src,
    size='md',
    bgColor='bg-indigo-600',
    className=''

})=>{
    const sizeClasses={
        xs: 'w-6 h-6 text-[10px]',
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm font-semibold',
        lg: 'w-12 h-12 text-base font-bold',
        xl: 'w-16 h-16 text-lg font-extrabold'
    }[size] || 'w-10 h-10 text-sm font-semibold';

    if(src){
        return(
            <img
            src={src}
            alt={name}
            className={`${sizeClasses} rounded-full object-cover border border-slate-200/80 shrink-0 ${className}`}
            referrerPolicy="no-referrer"
            />
        )
    }
    return(
        <div className={`${sizeClasses} rounded-full ${bgColor} text-white flex items-center justify-center font-bold tracking-tight shrink-0 ${className}`}>
            {getInitials(name)}
        </div>
    )
}
