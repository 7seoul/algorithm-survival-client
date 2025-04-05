import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col">
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
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
