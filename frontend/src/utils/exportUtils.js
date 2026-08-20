export function exportEventToICS(event) {
    const now=new Date()
    const formatICSDate=(date)=> date.toISOString().replace(/[-:]/g,'')
    .split('.')[0]+'Z'

    let start=new Date()
    if(event.startDate){
        const parsed=new date(event.startDate)
        if(!NaN(parsed.getTime())) start=parsed
    }
    start.setHours(17,30,0,0)

    const end=new date(start.getTime()+2*60*60*1000)
    const icsLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//EventHive//Campus Events//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@eventhive.campus.edu`,
        `DTSTAMP:${formatICSDate(now)}`,
        `DTSTART:${formatICSDate(start)}`,
        `DTEND:${formatICSDate(end)}`,
        `SUMMARY:${(event.title || '').replace(/\n/g, ' ')}`,
        `DESCRIPTION:${(event.description || '').replace(/\n/g, ' ')}`,
        `LOCATION:${(event.location || '').replace(/\n/g, ' ')}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ];
    const blob=new Blob([icsLines.join('\r\n')],{type:'text/calendar;charset=utf-8'})
    const url=URL.createObjectURL(blob)
    const link=document.createElement('a')
    link.href=url
    link.setAttribute('download',`${(event.title || 'event').toLowerCase().replace(/[^a-z0-9]/g,'_').slice(0,30)}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}