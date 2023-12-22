import React from 'react'
import { LuFileHeart } from 'react-icons/lu'

import SyncButton from './sync-button'

function MockUp() {
    return (
        <div className='border border-hive_green bg-white p-4 flex flex-col gap-2'>
            <div className='pb-4'>
                <h1>Mockup Files</h1>
                <h3 className='text-xs text-neutral-400'>In order to simulate syncing files.</h3>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-center gap-2'>
                    <LuFileHeart className='w-8 h-8 text-neutral-900 flex-shrink-0' strokeWidth={1} />
                    <div className='flex flex-col items-start justify-center'>
                        <p>File</p>
                        <p className='text-neutral-400 text-xs'>Stream 10 syncing operations</p>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <SyncButton operations={10} />
                </div>
            </div>
        </div>
    )
}

export default MockUp