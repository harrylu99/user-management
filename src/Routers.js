import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './HOC/Layout'
import Users from './Components/Users'
import UnderConstruction from './Components/UnderConstruction'

const Routers = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to='/users' />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/uc' element={<UnderConstruction />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Routers
