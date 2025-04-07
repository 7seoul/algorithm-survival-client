import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
import MainPage from '@/pages/MainPage'
import GroupInfoCard from '@/components/GroupInfoCard'
const queryClient = new QueryClient()

const group = {
  _id: 1,
  groupName: "알고리즘스터디그룹",
  admin: {
      handle: "gonudayo",
      name: "김건우"
  },
  memberData: [
      {
          name: "이름수정",
          handle: "gonudayo",
          streak: 3,
          score: 4
      },
      {
          name: "xiaowuc1",
          handle: "xiaowuc1",
          streak: 0,
          score: 0
      }
  ],
  description: "테스트 설명",
  score: 6009,
  initialStreak: 0,
  currentStreak: 0,
  createdAt: new Date('2025-04-04T03:48:56.836Z'),
  updatedAt: new Date('2025-04-06T21:00:00.590Z'),
  size: 2,
  maxStreak: 0,
  todayAllSolved: false,
  todaySolvedMembers: []
}

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
