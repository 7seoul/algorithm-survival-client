import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
import MainPage from '@/pages/MainPage'
import GroupInfoPage from '@/pages/GroupInfoPage'
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center bg-base-300">
      <Navbar />
        <div className="w-full max-w-6xl flex flex-col gap-6">
        <Routes>
          <Route path='/' element={<MainPage></MainPage>} />
          <Route path='/login' element={<></>} />
          <Route path='/register' element={<></>} />
          <Route path='/forget-password' element={<></>} />
          <Route path='/groups' element={<></>} />
          <Route path='/groups/:groupId' element={<GroupInfoPage></GroupInfoPage>} />
          <Route path='/rank' element={<></>} />
          <Route path='/*' element={<></>} />
        </Routes>
        </div>  
      </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
