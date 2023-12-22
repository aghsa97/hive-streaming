import React from 'react'
import { GiProcessor } from 'react-icons/gi'
import { GoPulse } from 'react-icons/go'

import { cn } from '@/utils'

interface DataTableProps {
    items: {
        client_id: string
        cpu_load: number
        timestamp: number
    }[]
}
function DataTable({ items }: DataTableProps) {
    return (
        <div className='border border-hive_green bg-white h-96 w-full p-4 overflow-y-auto space-y-2'>
            {items.length === 0 &&
                <div className='h-full flex flex-col items-center justify-center text-center'>
                    <p className='text-neutral-600'>
                        No data to display, database is empty.
                    </p>
                    <p className='text-neutral-400 text-xs'>
                        Sync some files to see the results
                    </p>
                </div>
            }
            {items.map((item: any, index: number) => (
                <div key={index} className='flex items-center justify-between'>
                    <div className='flex items-center justify-center gap-2'>
                        <GiProcessor className='w-8 h-8 text-neutral-900' />
                        <div className='flex flex-col items-start justify-center'>
                            <p>{item.client_id}</p>
                            <p className='text-neutral-400 text-xs'>{new Date(item.timestamp).toLocaleString("en-US", {
                                year: "numeric",
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                            })}</p>
                        </div>
                    </div>
                    <div className={cn('flex items-center justify-center gap-1 w-14 h-6 text-xs rounded-full',
                        item.cpu_load < 0.3 && 'bg-green-200 text-green-800',
                        item.cpu_load >= 0.3 && item.cpu_load < 0.7 && 'bg-yellow-200 text-yellow-800',
                        item.cpu_load >= 0.7 && 'bg-red-200 text-red-800'
                    )}>
                        {Math.round(item.cpu_load * 100)}%
                        <GoPulse className='w-3 h-3' />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DataTable