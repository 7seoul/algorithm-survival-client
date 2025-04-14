import { Link } from 'react-router'
import { authLogout } from '@/apis/apis'
import { useAuthStoreHook } from '@/stores/authStore'
import { checkUser } from '@/apis/apis'
import { useEffect } from 'react'

function Navbar(){
  const {isLogin, userHandle, login, logout} = useAuthStoreHook()
  useEffect(()=>{
    if(isLogin){
      checkUser().then((res)=>{
        console.log('check')
        if (res.success === true){
          login()
        }
        else{
          logout()
        }
      }).catch((res)=>{
        if (res.status === '401'){
          logout()
        }
      })
    }
  },[isLogin])
  
  return (
  <div className="navbar bg-base-200 shadow-sm sticky top-0 z-50">
    <div className="flex-1">
      <Link className="btn btn-ghost text-xl" to='/'>SurvivAlgo</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><Link to='/groups'>Group</Link></li>
        <li><Link to='/rank/groups/score'>Rank</Link></li>
        { isLogin ? (
          <>
            <li><button onClick={(e)=>{
              e.preventDefault()
              logout()
              authLogout()
            }}>Logout</button></li>
            <li><Link to='/'>{userHandle}</Link></li>
          </>
        ) :(
          <>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
          </>
        )
        }

        
      </ul>
    </div>
  </div>
  )
}

export default Navbar