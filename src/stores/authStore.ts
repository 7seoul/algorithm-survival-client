import { createStore, useStore } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isLogin : boolean
  login: ()=>void
  logout: ()=>void

  userHandle: string | null
  setUserHandle : (userHandle : string) => void
  userName : string | null
  setUserName : (userName : string) => void
}

export const useAuthStore = createStore(
  persist<AuthStore>(
    (set) => ({
      isLogin : false,
      login : ()=>set({isLogin : true}),
      logout : ()=>set({
        isLogin : false,
        userHandle : null,
        userName : null,
      }),
      userHandle : null,
      setUserHandle : (userHandle : string) => set({userHandle : userHandle}),
      userName : null,
      setUserName : (userName : string) => set({userName : userName})
    }),
    {
      name : 'authStorage'
    }
  )
)

export const useAuthStoreHook = () => useStore(useAuthStore)
