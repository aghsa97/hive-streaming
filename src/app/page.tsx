import React from 'react'


import MockUp from './_components/mock-up';
import Summary from './_components/summary';
import DataTable from './_components/data-table';
import EmptyDatabaseButton from './_components/delete-button';

export const dynamic = "force-dynamic"; // This is a hack to force Next.js to re-render this page on navigation

async function getDataFromDb() {
  const res = await fetch("http://localhost:3000/api/sync")
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


async function Home() {
  const { items }: {
    items: {
      client_id: string
      cpu_load: number
      timestamp: number
    }[]
  } = await getDataFromDb()
  const clientsWithHighCpuLoad = items.filter((item) => item.cpu_load >= 0.3 && item.cpu_load < 0.7)
  const clientsWithVeryHighCpuLoad = items.filter((item) => item.cpu_load >= 0.7)
  const clientsWithNormalCpuLoad = items.filter((item) => item.cpu_load < 0.3)

  return (
    <main className="flex flex-col md:flex-row items-start md:justify-between p-6 md:p-12 lg:p-24 gap-6">
      <div className='h-full w-full md:w-1/3 flex flex-col gap-3'>
        <MockUp />
        <Summary normal={clientsWithNormalCpuLoad.length} high={clientsWithHighCpuLoad.length} veryHigh={clientsWithVeryHighCpuLoad.length} />
      </div>
      <div className='h-full w-full md:w-2/3 flex flex-col gap-2'>
        <DataTable items={items} />
        <EmptyDatabaseButton />
      </div>
    </main >
  )
}

export default Home