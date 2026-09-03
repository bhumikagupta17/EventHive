import React, { Children } from "react";
import {getCategoryBadgeStyle,getTicketBadgeStyle} from "../../utils/formatters.jsx"

export const Badge=({
    children,
    variant='custom',
    category,
    status,
    ticket,
    className=''
})=>{
    if(variant=='category' && category){
        const style=getCategoryBadgeStyle(category)
        return(
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold shadow-xs ${style.pillClass} ${className}`}>
                {children || category}
            </span>
        )
    }
    if(variant=='status' && status){
        let statusClass='bg-slate-100 text-slate-600'
        if(status=='UPCOMING') statusClass='bg-purple-100 text-purple-700'
        if (status === 'PAST') statusClass = 'bg-slate-100 text-slate-500'
        if (status === 'DRAFT') statusClass = 'bg-slate-100 text-slate-600'
        return(
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusClass} ${className}`}>
                {children || status}
            </span>
        )
    }
    if(variant=='ticket' && ticket){
        const ticketClass = getTicketBadgeStyle(ticket);
        return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${ticketClass} ${className}`}>
            {children || ticket}
        </span>
        );
    }
    return(
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 ${className}`}>
            {children}
        </span>
    )
}