import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<></>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
