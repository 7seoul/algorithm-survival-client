import { useQuery } from '@tanstack/react-query'
import { getGroupList } from '@/apis/apis'
import { GroupListResponse } from '@/types/GroupType'
import GroupCard from '@/components/GroupCard'
// import { useState } from 'react'
// import { useAuthStoreHook } from '@/stores/authStore'
// import Modal from '@/components/Modal'
// import CreateGroupForm from '@/components/CreateGroupForm'

function GroupPage(){
  // const {isLogin} = useAuthStoreHook()
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  const {data, isLoading} = useQuery<GroupListResponse>({
    queryKey: [`groupList`],
    queryFn: async () => (await getGroupList()),
    staleTime: 1000 * 10
  })

  if (isLoading){
    return (<div className='w-full h-dvh flex justify-center items-center'>
      <span className="items-center loading loading-spinner loading-xl"></span>
    </div>)
  }

  return(
    <div className='flex flex-col gap-6 mt-6'>
      <div className="flex justify-between">
        <h1 className='font-semibold text-3xl'>그룹 탐색</h1>
        {/* 그룹 제작 기능 임시 제거 */}
        {/* { isLogin && (
          <>
          <button className='btn btn-success' onClick={()=>{setIsOpen(true)}}>그룹 생성하기</button>
          <Modal isOpen={isOpen} onClose={()=>{setIsOpen(false)}}>
            <CreateGroupForm />
          </Modal>
          </>
        ) } */}
        {/* 검색 기능 구현 예정 */}
        {/* <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input type="search" className="grow" placeholder="Search" />
        </label> */}
      </div>
      <section className="grid grid-cols-3 gap-4">
      {data?.success === true && data.groups.map((group)=>(
        <GroupCard key = {group._id} data={group} />
      ))}
      </section>
    </div>
  )
}

export default GroupPage