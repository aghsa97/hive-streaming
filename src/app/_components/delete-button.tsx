'use client'

import React from 'react'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function EmptyDatabaseButton() {
    const router = useRouter()

    const deleteData = async () => {
        try {
            const res = await fetch('/api/sync', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                throw new Error();
            }
            toast.success('Data deleted successfully');
        } catch (error) {
            toast.error('Failed to delete data');
        } finally {
            router.refresh()
        }
    }
    return (
        <button className='w-44 h-10 bg-red-600 hover:bg-red-600/80 text-white font-semibold py-2 px-4'
            onClick={deleteData}
        >
            Empty Database
        </button>
    )
}

export default EmptyDatabaseButton