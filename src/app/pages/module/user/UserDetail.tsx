import React, {useCallback, useEffect, useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import {useNavigate, useParams} from 'react-router-dom'
import {fetchSingleUser} from 'sr/utils/api/fetchUser'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {UserInterface} from 'sr/constants/User'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {keepPreviousData, useQuery} from '@tanstack/react-query'
import UserDetailsSkeleton from './UserDetailsSkeleton'
import SellerDetailsCard from './SellerDetailsCard'
import SellerDetailsSkeleton from './SellerDetailsSkeleton'

const Custom: React.FC<any> = () => {
  const navigate = useNavigate()
  const {userId} = useParams<{userId: string}>()
  // const [user, setUser] = useState<UserInterface>()
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const businessTypeReduxData: Record<string, string> = useSelector(
    (state: RootState) => state.businessType.businessTypeMap
  )
  const businessTypeReduxStatus: string = useSelector(
    (state: RootState) => state.businessType.status
  )
  const categoryReduxData: Record<string, string> = useSelector(
    (state: RootState) => state.categoryType.categoryMap
  )
  const categoryReduxStatus: string = useSelector((state: RootState) => state.categoryType.status)
  const {fetchBusinessType, fetchCategoryType} = useActions()
  // const renderVerificationStatus = (isVerified: boolean) => {
  //   return isVerified ? (
  //     <FaCheckCircle className='text-green-500' />
  //   ) : (
  //     <FaTimesCircle className='text-red-500' />
  //   )
  // }
  // const handleView = async (fileUrl: string) => {
  //   const response: any = await getPreSignedURL({fileName: fileUrl})
  //   window.open(response.results.url.toString(), '_blank')
  // }
  const {data, error, isLoading, isError, refetch} = useQuery<UserInterface>({
    queryKey: ['singleUser', userId],
    queryFn: async () => fetchSingleUser(userId),
    // placeholderData: keepPreviousData,
    retry: false,
  })

  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  const fetchDataIfNeeded = useCallback(() => {
    if (businessTypeReduxStatus != 'succeeded') fetchBusinessType({})
    if (categoryReduxStatus != 'succeeded') fetchCategoryType({})
  }, [businessTypeReduxStatus, categoryReduxStatus])

  const onGoBack = () => {
    navigate('/user')
  }
  return (
    <>
      {!isLoading ? (
        <>
          {data && (
            <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8'>
              <h2 className='text-2xl font-bold mb-6'>User Details</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <p className='mb-4'>
                    <strong className='font-medium'>Name:</strong> {data.firstName} {data.lastName}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Email:</strong> {data.email}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Phone:</strong> {data.phone}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Role:</strong> {data.role}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Source:</strong> {data.source}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Country:</strong> {data.country}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Email Verified:</strong>{' '}
                    {data.isEmailVerified ? 'Yes' : 'No'}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Phone Verified:</strong>{' '}
                    {data.isPhoneVerified ? 'Yes' : 'No'}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Become Verified:</strong>{' '}
                    {data.isBecomeVerified ? 'Yes' : 'No'}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Seller Status:</strong> {data.sellerStatus}
                  </p>
                </div>
                <div>
                  <p className='mb-4'>
                    <strong className='font-medium'>Location:</strong> Type: {data.location?.type},
                    Coordinates: [{data.location?.coordinates.join(', ')}]
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Business Type:</strong>{' '}
                    {data.businessType
                      ?.map((id) => businessTypeReduxData[id])
                      .filter((name) => name) // This filters out null or undefined values
                      .join(', ')}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Category:</strong>{' '}
                    {/* {user.category?.map((id) => categoryReduxData[id]).join(', ')} */}
                    {data.category
                      ?.map((id) => categoryReduxData[id])
                      .filter((name) => name) // This filters out null or undefined values
                      .join(', ')}
                  </p>
                  {/* <p className='mb-4'>
                    <strong className='font-medium'>Interest:</strong>{' '}
                    {user.interest?.map((id) => businessTypeReduxData[id]).join(', ')}
                  </p> */}
                  <p className='mb-4'>
                    <strong className='font-medium'>Created At:</strong>{' '}
                    {data.createdAt && new Date(data.createdAt).toLocaleString()}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Updated At:</strong>{' '}
                    {data.updatedAt && new Date(data.updatedAt).toLocaleString()}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>Seller Payment Plan ID:</strong>{' '}
                    {data.sellerPaymentPlanId}
                  </p>
                  <p className='mb-4'>
                    <strong className='font-medium'>ID:</strong> {data.id}
                  </p>
                </div>
              </div>

              {!isLoading && (
                <div className='mt-8 flex justify-between items-center'>
                  <div className='flex justify-center'>
                    <Button
                      className='bg-white text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
                      onClick={onGoBack}
                      label={'Go Back 🡸'}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <UserDetailsSkeleton />
      )}
    </>
  )
}
const UserDetailCard: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/user' />
}
export default UserDetailCard
