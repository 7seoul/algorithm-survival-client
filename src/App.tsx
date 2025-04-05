import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center">
      <Navbar />
        <div className="max-w-7xl flex flex-col gap-4">
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/login' element={<></>} />
          <Route path='/register' element={<></>} />
          <Route path='/forget-password' element={<></>} />
          <Route path='/group' element={<></>} />
          <Route path='/group:groupId' element={<></>} />
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
