import {FC, lazy, Suspense} from 'react'
import {Navigate} from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
// importing private routes
const ContactUs = lazy(async () => import('app/pages/module/contactUs/ContactUs'))
const AppConfigHistory = lazy(
  async () => import('app/pages/module/appConfigHistroy/appConfigHistory')
)
const Village = lazy(async () => import('app/pages/module/village/Village'))
const District = lazy(async () => import('app/pages/module/district/District'))
const SubDistrict = lazy(async () => import('app/pages/module/subDistrict/SubDistrict'))
const State = lazy(async () => import('app/pages/module/state/State'))
const AppVersionHistory = lazy(
  async () => import('app/pages/module/appVersionHistory/AppVersionHistory')
)
const CustomQuestions = lazy(
  async () => import('app/pages/module/question/question.masterData.page')
)
const QuestionPage = lazy(async () => import('app/pages/module/question/question.page'))
const Dashboard = lazy(async () => import('app/pages/module/dashboard/Dashboard'))
const Categories = lazy(async () => import('app/pages/module/masterData/categories/Categories'))
const BusinessCategory = lazy(async () => import('app/pages/module/masterData/business/Business'))
const SubCategory = lazy(
  async () => import('app/pages/module/masterData/subCategory/SubCategories')
)
const User = lazy(async () => import('app/pages/module/user/user.page'))
const ProgramList = lazy(async () => import('app/pages/module/program/Program'))
const Survey = lazy(async () => import('app/pages/module/survey/survey.page'))
const Section = lazy(async () => import('app/pages/module/section/section.page'))
const Products = lazy(async () => import('app/pages/module/masterData/product/Product'))
const Orders = lazy(async () => import('app/pages/module/masterData/order/Order'))
const ProductDetail = lazy(async () => import('app/pages/module/masterData/product/ProductDetail'))
const TransactionHistory = lazy(
  async () => import('app/pages/module/masterData/transactionsHistory/TransactionsHistory')
)
const PaymentHistory = lazy(async () => import('app/pages/module/masterData/payment/Payment'))
const InvitationCoupon = lazy(
  async () => import('app/pages/module/invitationCoupon/InvitationCoupon')
)
const SellerPaymentPlan = lazy(async () => import('app/pages/module/seller/SellerPaymentPlan'))

const SellerOnBoarding = lazy(async () => import('app/pages/module/seller/SellerOnBoarding'))
const ChangePassword = lazy(async () => import('app/pages/module/userProfile/ChangePassword'))
const EightSix = lazy(async () => import('app/pages/module/86/86'))
const EightySixResponse = lazy(async () => import('app/pages/module/86Response/86Response'))
const Chats = lazy(async () => import('app/pages/module/chats/Chats'))
const EightySixResponseDetailsCard = lazy(
  async () => import('app/pages/module/86Response/components/86ResponseDetailsCard')
)
// importing public routes
const AuthPage = lazy(async () => import('app/pages/module/auth/Login'))
const RegisterPage = lazy(async () => import('app/pages/module/auth/Register'))
const OtpPage = lazy(async () => import('app/pages/module/auth/OTP'))

type RouteConfig = {
  path: string
  element: JSX.Element
}

type WithChildren = {
  children: any
}

export const SuspensedView: FC<WithChildren> = ({children}) => {
  TopBarProgress.config({
    barColors: {
      '0': '#000',
    },
    barThickness: 4,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export const privateRoutes: RouteConfig[] = [
  {path: '/program', element: <ProgramList />},
  {path: '/survey', element: <Survey />},
  {path: '/survey/:id', element: <Survey />},
  {path: '/dashboard', element: <Dashboard />},
  {path: '/dashboard/:type', element: <Dashboard />},
  {path: '/business-category', element: <BusinessCategory />},
  {path: '/sub-category', element: <SubCategory />},
  {path: '/category', element: <Categories />},
  {path: '/user', element: <User />},
  {path: '/product', element: <Products />},
  {path: '/product/:productId', element: <ProductDetail />},
  {path: '/order', element: <Orders />},
  {path: '/transactions', element: <TransactionHistory />},
  {path: '/payment', element: <PaymentHistory />},
  {path: '/invitation-coupon', element: <InvitationCoupon />},
  {path: '/seller-payment-plan', element: <SellerPaymentPlan />},
  {path: '/mobile-app-version-history', element: <AppVersionHistory />},
  {path: '/seller-onboarding', element: <SellerOnBoarding />},
  {path: '/change-password', element: <ChangePassword />},
  {path: '/86', element: <EightSix />},
  {path: '/86-response', element: <EightySixResponse />},
  {path: '/86-response/:responseId', element: <EightySixResponseDetailsCard />},
  {path: '/chats', element: <Chats />},
  {path: '/question', element: <QuestionPage />},
  {path: '/section', element: <Section />},
  {path: '/all-questions', element: <CustomQuestions />},
  {path: '/state', element: <State />},
  {path: '/subDistrict', element: <SubDistrict />},
  {path: '/district', element: <District />},
  {path: '/village', element: <Village />},
  {path: '/mobile-app-config-history', element: <AppConfigHistory />},
  {path: '/complaints', element: <ContactUs />},
]

export const publicRoutes: RouteConfig[] = [
  {
    path: 'auth/*',
    element: <AuthPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'otp-verification',
    element: <OtpPage />,
  },
  {
    path: 'seller-onboarding/',
    element: <SellerOnBoarding />,
  },
  {
    path: '*',
    element: <Navigate to='/auth' />,
  },
]
