import React, {useCallback, useEffect, useMemo, useState} from 'react'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import TotalCard from './TotalResults'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import StatisticsCard from 'sr/helpers/ui-components/dashboardComponents/StatisticsCard'
import {DummyData, StatisticsData} from 'sr/constants/dashboard'
import {fetchDashboard} from './helpers/dashboard.helper'
import {dashboardCardInterface} from './dashboard.interface'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import SkeletonCard from './SkeletonDashboardCard'
import {Button} from 'sr/helpers'
import {FiRefreshCw} from 'react-icons/fi'
import {toast} from 'react-toastify'
import {statusMap} from 'sr/constants/status'

const Custom: React.FC = () => {
  // const [dashboardData, setDashboardData] = useState<any>([])
  const [totalCards, setTotalCards] = useState<dashboardCardInterface[]>([])
  const queryClient = useQueryClient()

  const {data, isLoading, isFetching} = useQuery({
    queryKey: ['dashboard-summary', {}],
    queryFn: async () => fetchDashboard(),
    staleTime: Infinity,
    // placeholderData: keepPreviousData,
  })

  useEffect(() => {
    if (!data) return
    const cards = Array.from(statusMap).map(([key, title]) => {
      const matchedItem = data.results.statusWiseSurveyCount.find((item) => item._id === key)

      return {
        title,
        total: matchedItem ? matchedItem.count : 0, // Set count to 0 if the status is not present
      }
    })

    // Sort the cards array in ascending order based on the total

    setTotalCards(cards.sort((a, b) => b.total - a.total))
    // setDashboardData(data.results)
  }, [data])

  return (
    <div className='p-4'>
      <div className='flex '>
        <h1 className='text-2xl font-bold  items-center'>Dashboard</h1>
        <Button
          Icon={() => (
            <FiRefreshCw
              className={`w-6 h-6 transition-transform duration-500 ${
                isFetching ? 'animate-spin' : ''
              }`}
            />
          )}
          label={''}
          onClick={async () => {
            await queryClient.invalidateQueries({queryKey: ['dashboard-summary']})
            toast.success('Dashboard refreshed successfully')
          }}
          className='ml-2'
        />
      </div>

      <h1 className='text-xl font-semibold mb-2'>Total</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        {isLoading || isFetching
          ? Array.from({length: 4}).map((_, index) => <SkeletonCard key={index} />)
          : totalCards.map((card, index) => (
              <TotalCard key={index} totalUsers={card.total} title={card.title} />
            ))}
      </div>

      {/* <h1 className='text-xl font-semibold mb-2'>Statistics</h1>
      <div className='mb-4 grid grid-cols-3 gap-3'>
        {statisticsSections.map((section, index) => (
          <StatisticsCard key={index} data={section.data} title={section.title} />
        ))}
      </div> */}
    </div>
  )
}

const Dashboard: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/dashboard' />
}

export default Dashboard
