import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export const DefaultLayout = () => {
  return (
    <main className="bg-white_color">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}
