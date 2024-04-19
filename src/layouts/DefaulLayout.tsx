import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export const DefaultLayout = () => {
  return (
    <main className="bg-bg_color">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}
