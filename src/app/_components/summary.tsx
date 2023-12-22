import React from 'react'
import { GiProcessor } from 'react-icons/gi'

type ClientCpuUsage = {
    normal: number;
    high: number;
    veryHigh: number;
}

function Summary({ normal, high, veryHigh }: ClientCpuUsage) {
    return (
        <div className='border border-hive_green bg-white p-4'>
            <div className='pb-6'>
                <h1>Summary</h1>
                <h3 className='text-xs text-neutral-400'>Summary of the CPU usage of all clients.</h3>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-center gap-2'>
                        <GiProcessor className='w-8 h-8 text-neutral-900' />
                        <div className='flex flex-col items-start justify-center'>
                            <p>Normal</p>
                            <p className='text-neutral-400 text-xs'>
                                Less than 30%
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-1 w-10 h-5 text-xs rounded-full bg-green-200 text-green-800'>
                        {normal}
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-center gap-2'>
                        <GiProcessor className='w-8 h-8 text-neutral-900' />
                        <div className='flex flex-col items-start justify-center'>
                            <p>High</p>
                            <p className='text-neutral-400 text-xs'>
                                Between 30% and 70%
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-1 w-10 h-5 text-xs rounded-full bg-yellow-200 text-yellow-800'>
                        {high}
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-center gap-2'>
                        <GiProcessor className='w-8 h-8 text-neutral-900' />
                        <div className='flex flex-col items-start justify-center'>
                            <p>Critical</p>
                            <p className='text-neutral-400 text-xs'>More than 70%</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-1 w-10 h-5 text-xs rounded-full bg-red-200 text-red-800'>
                        {veryHigh}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary