import { useEffect, useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

interface TokenPayload {
  sub: string
  exp: number
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('fitmind_token'))

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem('fitmind_token'))
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const isAuthenticated = useMemo(() => {
    if (!token) return false
    try {
      const decoded = jwtDecode<TokenPayload>(token)
      return decoded.exp * 1000 > Date.now()
    } catch (error) {
      console.error(error)
      return false
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem('fitmind_token')
    setToken(null)
  }

  return { token, isAuthenticated, logout }
}
