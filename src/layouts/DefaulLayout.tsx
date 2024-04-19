import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export const DefaultLayout = () => {
  return (
    <main className=''>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}
