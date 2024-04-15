import { Outlet } from 'react-router-dom'

export const DefaultLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  )
}
