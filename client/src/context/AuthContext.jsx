import { createContext, useEffect, useState } from 'react'
import { setAuthUserId } from '../api'

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const raw = localStorage.getItem('user')
    if (raw) {
      try{
        const u = JSON.parse(raw)
        setUser(u)
        setAuthUserId(u.id)
      }catch(e){
        console.error('Invalid user in localStorage', e)
        localStorage.removeItem('user')
      }
    }
  }, [])

  function login(u){
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
    setAuthUserId(u.id)
  }

  function logout(){
    setUser(null)
    localStorage.removeItem('user')
    setAuthUserId(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
