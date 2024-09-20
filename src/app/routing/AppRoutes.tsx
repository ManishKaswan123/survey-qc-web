import {lazy, FC, Suspense} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {useAuth} from 'sr/context/AuthProvider'
import {LayoutSplashScreen} from 'sr/layout/master-layout'
import ScrollToTop from 'app/ScrollToTop'
import {App} from 'app/App'
import PrivateRoutes from './PrivateRoutes'
import {publicRoutes} from './routing.constant'

const ErrorsPage = lazy(() => import('app/pages/module/errors/ErrorsPage'))
const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const {isAuthReady, isAuthenticated} = useAuth()

  if (!isAuthReady) {
    return <LayoutSplashScreen />
  }

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <ScrollToTop />
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage error={'Something went wrong'} />} />
          {isAuthenticated ? (
            <Route
              path='/*'
              element={
                <Suspense fallback={<LayoutSplashScreen />}>
                  <PrivateRoutes />
                </Suspense>
              }
            />
          ) : (
            publicRoutes.map(({path, element}) => (
              <Route
                key={path}
                path={path}
                element={<Suspense fallback={<LayoutSplashScreen />}> {element}</Suspense>}
              />
            ))
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
