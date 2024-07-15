import { Navigate, useLoaderData } from 'react-router-dom'

interface Props {
  redirectPath?: string
  children: JSX.Element
}

export const ProtectedRoute = ({ children }: Props) => {
  const user = useLoaderData()

  if (user === null) return <Navigate replace to="/" />

  return children
}

export const LoginProtectedRoute = ({ children }: Props) => {
  const user = useLoaderData()

  if (user) return <Navigate replace to="/" />

  return children
}