import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'


export const DefaultLayout = () => {
  return (
    <main>
    <Navbar/>

      <Outlet />
    </main>
  )
}
