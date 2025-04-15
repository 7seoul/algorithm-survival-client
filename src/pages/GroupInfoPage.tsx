import { acceptGroup, getGroupInfo } from '@/apis/apis'
import GroupInfoCard from '@/components/GroupInfoCard'
import GroupJoinButton from '@/components/GroupJoinButton'
import Modal from '@/components/Modal'
import RankTable from '@/components/RankTable'
import { useAuthStoreHook } from '@/stores/authStore'
import { GroupInfoResponse,  } from '@/types/GroupType'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ChevronLeft } from 'lucide-react'

type paramsType = {
  groupId : string
}

function GroupInfoPage(){
  const [type, setType] = useState<'score' | 'streak' | 'count'>('score')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { userHandle, isLogin } = useAuthStoreHook()
  const {groupId} = useParams() as paramsType
  const {data, isLoading, refetch} = useQuery<GroupInfoResponse>({
          queryKey: [`group/info/${groupId}`],
          queryFn: async () =>(await getGroupInfo(groupId)),
          staleTime: 1000 * 10
      })
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationKey: [`Accept join`],
    mutationFn: acceptGroup
  })

  const handleAccept = useCallback((user:{handle : string, name: string})=>{
    if(data?.success === true){
      mutation.mutate({handle:user.handle, groupId : data.group._id},{
        onSuccess : (data)=>{
          if (data.success === true){
            refetch()
            alert('승인되었습니다.')
          }
          else {
            refetch()
            alert('예기치 못한 에러가 발생했습니다.')
          }
        }
      })
    }
  },[data])

  if (isLoading){
    return (<div className='w-full h-dvh flex justify-center items-center'>
      <span className="items-center loading loading-spinner loading-xl"></span>
    </div>)
  }

  return(
    <section className='flex flex-col w-full gap-4 mt-4'>
    {data?.success === true && (
      <>
      <div className='w-full'>
        <div className='w-full flex justify-between gap-2'>
          <button className='btn btn-square' onClick={()=>{navigate(-1)}}>
            <ChevronLeft />
          </button>
          <div className='flex gap-2'>
          { isLogin && (
            <>
            {
              !data.group.isMember && (
                <GroupJoinButton data={data}></GroupJoinButton>
            )
            }
            {
              data.group.admin.handle === userHandle && (
                <>
                  <button className='btn btn-soft btn-success' onClick={()=>{setIsOpen(true)}}>그룹 신청 목록</button>
                  <Modal isOpen={isOpen} onClose={()=>{setIsOpen(false)}}>
                    { data.group.applications && data.group.applications.length > 0 ? (
                      <div className="overflow-x-auto bg-base-100 min-w-96">
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th className='text-center'>이름</th>
                            <th className='text-center'>참가 수락</th>
                          </tr>
                        </thead>
                      <tbody>
                        {data.group.applications.map((user, idx)=>(
                          <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td className='text-center'>{user.name}</td>
                            <td className='flex justify-center gap-2'>
                              {isLoading ? 
                                <span className="items-center loading loading-spinner loading-xl"></span>
                                : <button className='btn btn-soft btn-success' onClick={()=>handleAccept(user)}>수락</button>
                              }
                              {/* <button className='btn btn-soft btn-error'>거절</button> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      </table>
                      </div>
                    ) :(
                      <h1 className='p-12 text-3xl'>신청인이 없습니다.</h1>
                    ) }
                  </Modal>
                </>
              )
            }
            </>
          )}
          
          <button className='btn btn-soft btn-success' onClick={()=>{setType(value => value === 'streak' ? 'score' : value === 'score' ? 'count' : 'streak')}}>
            {type === 'streak' &&  <div>스트릭 순</div>}
            {type === 'score' && <div>점수 순</div>}  
            {type === 'count' && <div>푼 문제 순</div>}  
          </button>
          </div>
        </div>
      </div>

      <div className='flex flex-row w-full justify-between gap-4'>
        <article className="w-fit ">
          <GroupInfoCard data={data?.group}></GroupInfoCard>
        </article>
        <article className="w-full">
          <RankTable rankType={type} datas={{type: 'user', userDatas: (
            type === 'streak' 
            ? data.group.memberData.map((member)=>({handle : member.handle, name : member.name, imgSrc: member.imgSrc, maxStreak : member.maxStreak})).sort((a,b)=>(b.maxStreak - a.maxStreak)):
            type === 'count'
            ? data.group.memberData.map((member)=>({handle : member.handle, name : member.name, imgSrc: member.imgSrc, count : member.count})).sort((a,b)=>(b.count - a.count))
            : data.group.memberData.map((member)=>({handle : member.handle, name : member.name, imgSrc: member.imgSrc, score : member.score})).sort((a,b)=>(b.score - a.score))
            )}}>
          </RankTable>
        </article>
      </div>
      </>)
      }
    </section>
  )
  
}

export default GroupInfoPage