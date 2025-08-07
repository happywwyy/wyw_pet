import { useState } from 'react'
import './App.css'
import{
  Suspense,
  lazy,
} from 'react'
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import MainLayout from '@/components/MainLayout'
import BlankLayout from '@/components/BlankLayout'
import Loading from '@/components/Loading'
import Toast from '@/components/Toast'


const Home = lazy(() => import('@/pages/Home'))
const Shop = lazy(() => import('@/pages/Shop'))
const ShopSearch = lazy(() => import('@/pages/ShopSearch'))
const Collection = lazy(() => import('@/pages/Collection'))
const Community = lazy(() => import('@/pages/Community'))
const Account = lazy(() => import('@/pages/Account'))
const Detail = lazy(() => import('@/pages/Detail'))
const Login = lazy(() => import('@/pages/Login'))

function App() {
  return (
    <>
       <Suspense fallback={<Loading/>}>
            {/* 你的网站可能由多套模板 */}
            {/* 带有tabbar的Layout */}
            <Routes >
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/community" element={<Community />} />
              <Route path="/account" element={<Account />} />
            </Route>
            
            {/* 不带tabbar的Layout */}
              <Route element={<BlankLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/shop/search" element={<ShopSearch />} />
              </Route>
            </Routes>
       </Suspense>
       <Toast />
    </>
  )
}

export default App