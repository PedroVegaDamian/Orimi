import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useNavigationHistory = () => {
  const [history, setHistory] = useState<string[]>([])
  const location = useLocation()

  useEffect(() => {
    setHistory(prevHistory => [...prevHistory, location.pathname])
  }, [location.pathname])
  console.log('history', history)

  return history
}

// history 
// []
// length
// : 
// 0
// [[Prototype]]
// : 
// Array(0)
