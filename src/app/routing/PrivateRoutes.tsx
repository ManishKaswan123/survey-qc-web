import {useAuth} from 'app/pages/module/auth/core/Auth'
import {FC} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from 'sr/layout/MasterLayout'
import {privateRoutes, SuspensedView} from './routing.constant'

const PrivateRoutes: FC = () => {
  // const {auth} = useAuth()
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {privateRoutes.map(({path, element}) => (
          <Route key={path} path={path} element={<SuspensedView>{element}</SuspensedView>} />
        ))}
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Route>
    </Routes>
  )
}

export default PrivateRoutes
