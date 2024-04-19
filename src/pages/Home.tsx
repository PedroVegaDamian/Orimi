import { useStore } from '@/store'

export const HomePage = () => {
  const bears = useStore(state => state.bears)

  return (
    <div>
     <h1>{bears} around here...</h1>
    </div>
  )
}
