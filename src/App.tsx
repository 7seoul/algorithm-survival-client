import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
import MainPage from '@/pages/MainPage'
import GroupInfoPage from '@/pages/GroupInfoPage'
import GroupPage from '@/pages/GroupPage'
import GroupRankPage from '@/pages/GroupRankPage'
import UserRankPage from '@/pages/UserRankPage'
import Foot from '@/components/Footer'
import LoginPage from '@/pages/LoginPage'
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center bg-base-300 pb-12">
      <Navbar />
        <div className="w-full max-w-6xl flex flex-col gap-6">
        <Routes>
          <Route path='/' element={<MainPage></MainPage>} />
          <Route path='/login' element={<LoginPage></LoginPage>} />
          <Route path='/register' element={<></>} />
          <Route path='/forget-password' element={<></>} />
          <Route path='/groups' element={<GroupPage></GroupPage>} />
          <Route path='/groups/:groupId' element={<GroupInfoPage></GroupInfoPage>} />
          <Route path='/rank/groups/:rankType' element={<GroupRankPage></GroupRankPage>} />
          <Route path='/rank/users/:rankType' element={<UserRankPage></UserRankPage>} />
          <Route path='/*' element={<></>} />
        </Routes>
        </div>  
      </div>
      <Foot />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
