import { Link } from 'react-router'
import { useAuthStoreHook } from '@/stores/authStore'
import { authLogout } from '@/apis/apis'

function Navbar(){
  const { isLogin, userHandle, logout } = useAuthStoreHook()
  return (
  <div className="navbar bg-base-200 shadow-sm sticky top-0 z-50">
    <div className="flex-1">
      <Link className="btn btn-ghost text-xl" to='/'>Algorithm_Survival</Link>
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
          <li><Link to='/register'>Register</Link></li>
          </>
        )
        }

        
      </ul>
    </div>
  </div>
  )
}

export default Navbar