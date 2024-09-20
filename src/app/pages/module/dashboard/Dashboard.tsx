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

const Custom: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>([])
  const [totalCards, setTotalCards] = useState<dashboardCardInterface[]>([])
  const queryClient = useQueryClient()

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['dashboard-summary', {}],
    queryFn: async () => fetchDashboard(),
    staleTime: Infinity,
    // placeholderData: keepPreviousData,
  })

  useEffect(() => {
    if (!data) return
    const cards = data.results.statusWiseSurveyCount.map((item) => ({
      title: item._id,
      total: item.count,
    }))
    setTotalCards(cards)
    setDashboardData(data.results)
  }, [data])

  // const calculatePercentage = (amount: number, total: number): string =>
  //   `${((amount / total) * 100).toFixed(1)}%`

  return (
    <div className='p-4'>
      <div className='flex '>
        <h1 className='text-2xl font-bold  items-center'>Dashboard</h1>
        <Button
          Icon={FiRefreshCw}
          label={''}
          onClick={async () => {
            await queryClient.invalidateQueries({queryKey: ['dashboard-summary']})
            toast.success('Dashboard refreshed successfully')
          }}
          className='items-center ml-2'
        ></Button>
      </div>

      <h1 className='text-xl font-semibold mb-2'>Total</h1>
      <div className='mb-6 grid grid-cols-4 gap-3 w-full'>
        {isLoading
          ? Array.from({length: 2}).map((_, index) => <SkeletonCard key={index} />)
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
