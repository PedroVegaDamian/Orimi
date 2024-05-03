import { Button } from './ui'
import { useNavigate } from 'react-router-dom'

export const EmptyCart = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mt-20 justify-toph-screen">
        <h1 className="text-3xl font-bold text-center text-primary_800_color">
          Your cart is empty
        </h1>
        <div className="flex mt-10">
          <Button onClick={() => navigate('/')}>Go back to home</Button>
        </div>
      </div>
    </div>
  )
}
