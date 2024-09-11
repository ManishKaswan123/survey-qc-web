import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

type Props = {
  getScenarios?: any
  AdjustWidth?: any
}
// import { useRouter } from "next/router";

export default function AsideMenuMain({getScenarios, AdjustWidth}: Props) {
  const scenarios = getScenarios ? JSON.parse(getScenarios) : []

  // find current url
  const location = useLocation()
  // redux
  // states
  const [path, setPath] = useState<string | null>('')
  const [subPath, setSubPath] = useState<string | null>('')
  const [fullPath, setFullPath] = useState<any | null>([])
  const [sideCollapse, setSideCollapse] = useState<any | null>('sm:w-full md:w-1/6')
  const [sideCollapseItem, setSideCollapseItem] = useState<any | null>('show')
  const [show, setShow] = useState<any | null>(false)
  const [collapseShow, setCollapseShow] = useState('hidden')
  const [width, setWidth] = useState<any | null>(
    'sm:mt-20 md:mt-[75px] md:w-5/6 bg-gray-100 sm:w-full duration-1000 ease-in-out'
  )
  // const [sideCollapseItemPadding, setSideCollapseItemPadding] = useState("");
  // function

  const backUrl = () => {
    // navigate.push(-1)
  }
  // function

  const SidebarCollapsible = () => {
    if (sideCollapseItem === 'show') {
      setSideCollapseItem('hidden')
      setSideCollapse('w-[7%] duration-1000 ease-in-out')
      AdjustWidth()
    } else {
      setSideCollapse('sm:w-full md:w-1/6 duration-1000 ease-in-out')
      setSideCollapseItem('show')
      AdjustWidth()
    }
  }

  useEffect(() => {
    const uri = location.pathname.split('/')
    setFullPath(uri)
    setPath(uri[1])
    setSubPath(uri[2])
  }, [location])

  return (
    <>
      <div className={` md:block md:relative sm:absolute  ${sideCollapse}`}>
        <nav
          className={` ${sideCollapse} fixed sm:h-[5rem] md:h-full z-50 md:left-0 md:block md:top-0 md:bottom-0 md:overflow-hidden md:flex-row md:flex-nowrap shadow-xl bg-[#F7F7F7] flex flex-wrap items-center justify-between xl:px-2  md:px-2`}
        >
          <div className='md:flex-col md:items-stretch md:min-h-screen md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto h-full'>
            {/* Toggler */}
            <div className='sm:flex sm:flex-row sm:items-center'>
              <button
                className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                type='button'
                onClick={() => setCollapseShow('bg-white my-2 py-3 px-6')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                onClick={backUrl}
                className='h-5 w-5 cursor-pointer text-rose-800 md:hidden sm:show'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </svg>
            </div>

            {/* Brand */}
            <div className='flex items-center justify-around'>
              <Link to='/dashboard' className='flex items-end justify-center py-2'>
                <button className='text-rose-800 md:block text-left text-blueGray-600 mr-0 inline-block whitespace-nowrap sm:text-xl md:text-4xl font-bold sm:pr-2 md:pr-0'>
                  {sideCollapseItem === 'show' ? (
                    <img
                      className='w-[8rem]'
                      src={'/media/logos/company_logo.jpeg'}
                      alt='86DeadStock'
                    />
                  ) : (
                    '86'
                  )}
                </button>
              </Link>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                onClick={SidebarCollapsible}
                className='mt-[10px] sm:hidden md:block h-8 w-8 mx-2 cursor-pointer text-rose-800'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h8m-8 6h16' />
              </svg>
            </div>
            {/* Collapse */}
            <div
              className={
                'h-[100vh] md:pt-4 sm:pt-0 md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden  items-center flex-1 rounded justify-between ' +
                collapseShow
              }
            >
              <div className='md:min-w-full  md:hidden  py-4 border-b-[0.5px] border-rose-600 mb-2'>
                <div className='flex flex-wrap'>
                  <div className='w-full flex justify-between items-center'>
                    <Link to='/dashboard'>
                      <button className='md:block text-left md:pb-2 text-rose-800 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-xl uppercase font-bold px-0'>
                        86DeadStock
                      </button>
                    </Link>
                    <button
                      type='button'
                      className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                      onClick={() => setCollapseShow('hidden')}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex justify-between flex-col h-full'>
                {/* Navigation */}
                <div>
                  <h6
                    className={` pl-[0.2rem] md:min-w-full text-rose-800 text-sm uppercase font-bold block pt-4 pb-2 no-underline`}
                  ></h6>
                  <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
                    <li className='items-center'>
                      <Link to='/program' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                            path === 'program' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2h-2m-4 0v4m0-4H9m0 0H7'
                            />
                          </svg>

                          {sideCollapseItem === 'show' ? (
                            <span className='text-left'>Program</span>
                          ) : (
                            ''
                          )}
                        </button>
                      </Link>
                    </li>
                    <li className='items-center'>
                      <Link to='/section' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                            path === 'section' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 7h18M3 11h18M3 15h18M3 19h18'
                            />
                          </svg>

                          {sideCollapseItem === 'show' ? (
                            <span className='text-left'>Section</span>
                          ) : (
                            ''
                          )}
                        </button>
                      </Link>
                    </li>
                    <li className='items-center'>
                      <Link to='/dashboard' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                            path === 'dashboard' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 9.75L12 4l9 5.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 21V11.25a1 1 0 011-1h4a1 1 0 011 1V21'
                            />
                          </svg>

                          {sideCollapseItem === 'show' ? (
                            <span className='text-left'>Home</span>
                          ) : (
                            ''
                          )}
                        </button>
                      </Link>
                    </li>
                    <li
                      onClick={() => setShow(!show)}
                      className='uppercase flex items-center cursor-pointer text-gray-900 font-semibold hover:text-rose-600'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 3C7.589 3 4 4.477 4 6.25v11.5C4 19.523 7.589 21 12 21s8-1.477 8-3.25V6.25C20 4.477 16.411 3 12 3zM4 9c0 1.773 3.589 3.25 8 3.25s8-1.477 8-3.25'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M4 14.25c0 1.773 3.589 3.25 8 3.25s8-1.477 8-3.25'
                        />
                      </svg>

                      {sideCollapseItem === 'show' ? (
                        <span className='flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500'>
                          Master Data
                        </span>
                      ) : (
                        ''
                      )}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 ml-auto'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        {show ? (
                          <path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7' />
                        ) : (
                          <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                        )}
                      </svg>
                    </li>
                    {show === true && (
                      <ul className='pl-6'>
                        {' '}
                        {/* Added padding-left for indentation */}
                        <li className='items-center'>
                          <Link to='/business-category' replace>
                            <button
                              className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                                path === 'business-category' && subPath === undefined
                                  ? 'text-rose-600'
                                  : ''
                              }`}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 mr-2'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M9 12h6m2 4H7m12-8H5m16 8a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                              </svg>

                              {sideCollapseItem === 'show' ? (
                                <span className='text-left'>Business Category</span>
                              ) : (
                                ''
                              )}
                            </button>
                          </Link>
                        </li>
                        <li className='items-center'>
                          <Link to='/category' replace>
                            <button
                              className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500  ${
                                path === 'category' && subPath === undefined ? 'text-rose-600' : ''
                              }`}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 mr-2'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M3 7a1 1 0 011-1h16a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V7zM3 14a1 1 0 011-1h16a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3z'
                                />
                              </svg>

                              {sideCollapseItem === 'show' ? (
                                <span className='text-left'>Category</span>
                              ) : (
                                ''
                              )}
                            </button>
                          </Link>
                        </li>
                        <li className='items-center'>
                          <Link to='/sub-category' replace>
                            <button
                              className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500  ${
                                path === 'sub-category' && subPath === undefined
                                  ? 'text-rose-600'
                                  : ''
                              }`}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 mr-2'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M4 6h16M4 12h8m-8 6h16'
                                />
                              </svg>

                              {sideCollapseItem === 'show' ? (
                                <span className='text-left'>Sub Category</span>
                              ) : (
                                ''
                              )}
                            </button>
                          </Link>
                        </li>
                        <li className='items-center'>
                          <Link to='/invitation-coupon' replace>
                            <button
                              className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                                path === 'invitation-coupon' && subPath === undefined
                                  ? 'text-rose-600'
                                  : ''
                              }`}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 mr-2'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M9 11V9a2 2 0 114 0v2m-4 0a2 2 0 104 0m0 0v2a2 2 0 11-4 0v-2m0 0H6a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3'
                                />
                              </svg>

                              {sideCollapseItem === 'show' ? (
                                <span className='text-left'>Invitation Coupon</span>
                              ) : (
                                ''
                              )}
                            </button>
                          </Link>
                        </li>
                        <li className='items-center'>
                          <Link to='/seller-payment-plan' replace>
                            <button
                              className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                                path === 'seller-payment-plan' && subPath === undefined
                                  ? 'text-rose-600'
                                  : ''
                              }`}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 mr-2'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M6 12h12M6 16h12M6 8h12M6 20h12M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z'
                                />
                              </svg>

                              {sideCollapseItem === 'show' ? (
                                <span className='text-left'>Seller Payment Plan</span>
                              ) : (
                                ''
                              )}
                            </button>
                          </Link>
                        </li>
                        <li className='items-center'>
                          <Link to='/mobile-app-version-history' replace>
                            <button
                              className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                                path === 'mobile-app-version-history' && subPath === undefined
                                  ? 'text-rose-600'
                                  : ''
                              }`}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 mr-2'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M12 8v4l3 3M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z'
                                />
                              </svg>

                              {sideCollapseItem === 'show' ? (
                                <span className='text-left'>Mobile App Version History</span>
                              ) : (
                                ''
                              )}
                            </button>
                          </Link>
                        </li>
                      </ul>
                    )}
                    <li className='items-center'>
                      <Link to='/user' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500  ${
                            path === 'user' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12 14c-3.866 0-7 3.134-7 7m14 0c0-3.866-3.134-7-7-7m0-6a3 3 0 100-6 3 3 0 000 6z'
                            />
                          </svg>

                          {sideCollapseItem === 'show' ? (
                            <span className='text-left'>User</span>
                          ) : (
                            ''
                          )}
                        </button>
                      </Link>
                    </li>
                    <li className='items-center'>
                      <Link to='/product' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                            path === 'product' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3 8h18M3 12h18M3 16h18M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z'
                            />
                          </svg>

                          {sideCollapseItem === 'show' ? (
                            <span className='text-left'>Product</span>
                          ) : (
                            ''
                          )}
                        </button>
                      </Link>
                    </li>
                    <li className='items-center'>
                      <Link to='/order' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                            path === 'order' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12 4a3 3 0 00-3 3v2H4v12h16V9h-5V7a3 3 0 00-3-3zM8 8h8V7H8v1zM6 12h12v2H6v-2zm0 4h12v2H6v-2z'
                            />
                          </svg>

                          {sideCollapseItem === 'show' ? (
                            <span className='text-left'>Order</span>
                          ) : (
                            ''
                          )}
                        </button>
                      </Link>
                    </li>
                    <li className='items-center'>
                      <Link to='/transactions' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                            path === 'transactions' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M5 11h14M5 15h14M5 19h14M3 5h18a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z'
                            />
                            <circle cx='8' cy='13' r='2' stroke='currentColor' strokeWidth='2' />
                            <circle cx='12' cy='13' r='2' stroke='currentColor' strokeWidth='2' />
                            <circle cx='16' cy='13' r='2' stroke='currentColor' strokeWidth='2' />
                          </svg>

                          {sideCollapseItem === 'show' ? (
                            <span className='text-left'>Transaction</span>
                          ) : (
                            ''
                          )}
                        </button>
                      </Link>
                    </li>
                    <li className='items-center'>
                      <Link to='/86' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                            path === '86' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M9 12a3 3 0 100-6 3 3 0 000 6zM15 12a3 3 0 100-6 3 3 0 000 6zM9 12a3 3 0 100 6 3 3 0 000-6zM15 12a3 3 0 100 6 3 3 0 000-6z'
                            />
                          </svg>

                          {sideCollapseItem === 'show' ? <span className='text-left'>86</span> : ''}
                        </button>
                      </Link>
                    </li>
                    <li className='items-center'>
                      <Link to='/86-response' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                            path === '86-response' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M9 12a3 3 0 100-6 3 3 0 000 6zM15 12a3 3 0 100-6 3 3 0 000 6zM9 12a3 3 0 100 6 3 3 0 000-6zM15 12a3 3 0 100 6 3 3 0 000-6z'
                            />
                          </svg>

                          {sideCollapseItem === 'show' ? (
                            <span className='text-left'>86 Response</span>
                          ) : (
                            ''
                          )}
                        </button>
                      </Link>
                    </li>
                    <li className='items-center'>
                      <Link to='/chats' replace>
                        <button
                          className={`flex md:text-xs lg:text-sm uppercase py-3 font-semibold hover:text-rose-600 text-left text-gray-500 ${
                            path === 'chats' && subPath === undefined ? 'text-rose-600' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z'
                            />
                          </svg>

                          {sideCollapseItem === 'show' ? (
                            <span className='text-left'>Chats</span>
                          ) : (
                            ''
                          )}
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                {/* Divider */}
                <hr className='lg:hidden md:min-w-full bg-rose-600 text-rose-600' />
                <h6
                  className={`lg:hidden md:block pl-[0.2rem] md:min-w-full text-rose-800 text-sm uppercase font-bold block md:pt-4 sm:pt-4 pb-2 no-underline `}
                >
                  {sideCollapseItem === 'show' ? 'DOCUMENTATION' : 'DOC'}
                </h6>
                <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
                  <li className='items-center lg:hidden md:block'>
                    <div
                      onClick={() => {}}
                      className={` flex text-sm uppercase py-3 font-bold hover:text-rose-600 text-gray-500 `}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                        />
                      </svg>
                      <span className=''>{sideCollapseItem === 'show' ? 'LogOut' : 'LogOut'}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
