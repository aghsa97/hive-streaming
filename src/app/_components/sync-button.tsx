'use client'

import { toast } from 'sonner'
import React from 'react'
import { CgSpinner } from "react-icons/cg";
import { useRouter } from 'next/navigation';

import { cn, generateMockClientId, generateMockCpuLoad } from '@/utils';

export type ClientCpuUsage = {
    clientId: string;
    cpuUsage: { timestamp: number, load: number };
}

interface SyncButtonProps {
    operations: number;
}

function SyncButton({ operations }: SyncButtonProps) {
    // This is a FIFO queue to store the items to be sent to the server, 
    // in React we can't use a normal array because it will not trigger a re-render.
    // We use a state to store the queue and a function to push items to the queue.
    const [queue, setQueue] = React.useState<ClientCpuUsage[]>([]);
    const [retryTime, setRetryTime] = React.useState(1000)
    const [retryCount, setRetryCount] = React.useState(0)
    const [syncing, setSyncing] = React.useState(false)
    const router = useRouter()

    // Function to push an item to the queue
    const enqueue = (item: ClientCpuUsage) => {
        setQueue((prev) => [...prev, item]);
    };

    React.useEffect(() => {
        const sendDataToServer = async () => {
            if (queue.length === 0) {
                setSyncing(false);
                return;
            }

            setSyncing(true);
            const dataToSend = queue[0]; // Get the first item, Same as queue.peek()
            setTimeout(async () => { // Send the data after a delay to simulate network latency and to avoid sending too many requests at once
                try {
                    const res = await fetch('/api/sync', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataToSend),
                    });
                    if (!res.ok) {
                        if (res.status === 400) {
                            toast.error('Invalid data');
                            // Remove the sent item from the queue if the data is invalid
                            setQueue(prev => prev.slice(1));
                            return;
                        }
                        // Keep the item in the queue and retry
                        throw new Error(`Failed to send data`);
                    }
                    toast.success('Synced successfully');
                    // Remove the sent item from the queue on success
                    setQueue(prev => prev.slice(1));
                    setRetryTime(1000);
                    setRetryCount(0);
                } catch (error) {
                    console.log("error", error);
                    toast.error('Failed to sync', { style: { backgroundColor: 'red', color: "white" } });
                    if (retryCount >= 3) {
                        // If the item has been retried 3 times, remove it from the queue. (NOTE: More explination in the README.md file)
                        setQueue(prev => prev.slice(1));
                        setRetryTime(1000);
                        setRetryCount(0);
                        return;
                    }
                    // Keep the item in the queue and retry, React will re-render the component and call this function again on state change
                    setQueue(prev => [...prev]);
                    setRetryTime(prev => prev * 2);
                    setRetryCount(prev => prev + 1);
                } finally {
                    setSyncing(false);
                    router.refresh();
                }
            }, retryTime);
        };

        if (queue.length > 0 && !syncing) {
            sendDataToServer();
        }
    }, [queue, syncing, router, retryTime, retryCount]);


    const sync = () => {
        const clientId = "client_" + generateMockClientId(); // prefix client_ to avoid confusion with the server
        for (let i = 0; i < operations; i++) {
            const cpuUsage = generateMockCpuLoad();
            enqueue({ clientId, cpuUsage });
        }
    }


    return (
        <button className={cn('text-sm px-6 py-2.5 bg-hive_orange hover:bg-hive_blue transition-colors duration-150 ease-in-out text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
            syncing && 'bg-hive_orange/50'
        )}
            onClick={sync}
        >
            {syncing && <CgSpinner className='animate-spin w-5 h-5' />}
            Sync
        </button>
    )
}

export default SyncButton