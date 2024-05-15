import { auth } from '@/firebase'
import { useUserStore } from '@/store/userStore'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)

  const handleSignOut = async () => {
    await signOut(auth)
    setUser(null)
    navigate('/')
  }

  return (
    <div>
      <h1>ProfilePage</h1>
      <button
        onClick={handleSignOut}
        className="bg-red_color text-white_color p-2 rounded"
      >
        Sign Out
      </button>
    </div>
  )
}
