import { getGroupInfo } from '@/apis/apis'
import GroupInfoCard from '@/components/GroupInfoCard'
import GroupJoinButton from '@/components/GroupJoinButton'
import RankTable from '@/components/RankTable'
import { useAuthStoreHook } from '@/stores/authStore'
import { GroupInfoResponse,  } from '@/types/GroupType'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router'

type paramsType = {
  groupId : string
}

function GroupInfoPage(){
  const [type, setType] = useState<boolean>(false)
  const { userHandle, isLogin } = useAuthStoreHook()
  const {groupId} = useParams() as paramsType
  const {data, isLoading} = useQuery<GroupInfoResponse>({
          queryKey: [`info${groupId}`],
          queryFn: async () =>(await getGroupInfo(groupId)),
          staleTime: 1000 * 10
      })

  console.log(data)

  if (isLoading){
    return (<div className='w-full h-dvh flex justify-center items-center'>
      <span className="items-center loading loading-spinner loading-xl"></span>
    </div>)
  }

  return(
    <section className='flex flex-row w-full justify-between gap-4 mt-6'>
      {data?.success === true && (
      <>
      <div className="w-fit ">
        <GroupInfoCard data={data?.group}></GroupInfoCard>
      </div>
      
      <div className='w-full'>
        <div className='w-full flex justify-end mb-4 gap-2'>
          { isLogin && (
            <>
            {
              !data.group.isMember && (
                <GroupJoinButton data={data}></GroupJoinButton>
            )
            }
            {
              data.group.admin.handle === userHandle && (
                <button className='w-fit btn btn-success'>
                  그룹 신청 목록 보기
                </button>
              )
            }
            </>
          )}
          
          <button className='btn btn-success' onClick={()=>{setType(value => !value)}}>
            {type ? 
              <div className="">점수 순으로 보기</div> : 
              <div className="">스트릭 순으로 보기</div>
            }
          </button>
        </div>
        <RankTable datas={{type: 'user', userDatas: data.group.memberData} }>
        </RankTable>
      </div>
      </>)
      }
    </section>
  )
  
}

export default GroupInfoPage