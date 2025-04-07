import { getGroupInfo } from '@/apis/apis'
import GroupInfoCard from '@/components/GroupInfoCard'
import RankTable from '@/components/RankTable'
import { GroupInfoResponse,  } from '@/types/GroupType'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router'

type paramsType = {
  groupId : string
}

function GroupInfoPage(){
  const [type, setType] = useState<boolean>(false)
  
  const {groupId} = useParams() as paramsType
  const {data, isLoading} = useQuery<GroupInfoResponse>({
          queryKey: [`info${groupId}`],
          queryFn: async () =>(await getGroupInfo(groupId)),
          staleTime: 1000 * 10
      })

  if (isLoading){
    return (<div className='w-full h-dvh flex justify-center items-center'>
      <span className="items-center loading loading-spinner loading-xl"></span>
    </div>)
  }

  return(
    <section className='flex flex-row w-full justify-between gap-4 mt-6'>
      {data?.success === true && (
      <>
      <div className="w-fit">
        <GroupInfoCard data={data?.group}></GroupInfoCard>
      </div>
      
      <div className='w-full'>
        <div className='w-full flex justify-end mb-4'>
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