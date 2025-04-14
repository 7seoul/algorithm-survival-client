import { getGroupRank } from '@/apis/apis'
import RankTable from '@/components/RankTable'
import { GroupRankResponse } from '@/types/GroupType'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'

type paramsType = {
  rankType : 'streak' | 'score'
}

function GroupRankPage(){
  const {rankType} = useParams() as paramsType
  const {data, isLoading} = useQuery<GroupRankResponse>({
      queryKey: [`group/${rankType}/data`],
      queryFn: async () => (await getGroupRank(rankType)),
      staleTime: 1000 * 10
    })

  if (isLoading){
    return (<div className='w-full h-dvh flex justify-center items-center'>
      <span className="items-center loading loading-spinner loading-xl"></span>
    </div>)
  }

  return(
    <>
    <div className='flex flex-row gap-6 mt-6 justify-between'>
      <h1 className='font-semibold text-3xl'>{`그룹 ${rankType === 'score' ? '점수' : '스트릭'} 랭킹`}</h1>
      {rankType && <div role="tablist" className="w-fit tabs tabs-box">
        <Link to="/rank/groups/score" role="tab" className={`tab ${rankType === 'score' && 'tab-active'}`}>그룹 점수</Link>
        <Link to="/rank/groups/streak" role="tab" className={`tab ${rankType === 'streak' && 'tab-active'}`}>그룹 스트릭</Link>
        <Link to="/rank/users/score" role="tab" className="tab">유저 점수</Link>
        <Link to="/rank/users/streak" role="tab" className="tab">유저 스트릭</Link>
      </div>}
    </div>
    { data?.success === true &&
      <RankTable datas={{type:'group', groupDatas:data.result}}>
      </RankTable>
    }
    </>
  )
}

export default GroupRankPage