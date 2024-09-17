import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import ScrollToTop from '@/hooks/scrollToTop.ts'
import { getCurrentUser, getUserById } from '@/services/user'
import { useUserStore } from '@/store/userStore'

const DefaultLayout = () => {
  const setUser = useUserStore(state => state.setUser)
  const setLoading = useUserStore(state => state.setLoading)

  const handleAuth = async () => {
    try {
      setLoading(true)
      const user = await getCurrentUser()
      const userData = await getUserById(user?.uid as string)
      setUser(userData)
    } catch (error) {
      console.error(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  handleAuth()

  return (
    <main className="bg-bg_color grid grid-rows-[auto_1fr_auto] min-h-screen">
      <ScrollToTop />
      <Navbar />
      <section>
        <Outlet />
      </section>
      <Footer />
    </main>
  )
}

export default DefaultLayout
