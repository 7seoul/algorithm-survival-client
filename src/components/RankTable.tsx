import { getAvatarUrl } from '@/apis/apis'
import { Calendar, Medal } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { GroupRank, UserRank } from '@/types/GroupType'

interface groupTableProps {
  rankType : 'score' | 'count' | 'streak',
  datas : {
    type : 'group',
    groupDatas : Array<GroupRank>
  } | {
    type : 'user',
    userDatas : Array<UserRank>
  }
}





function RankTable({rankType, datas} : groupTableProps){
  const navigate = useNavigate()
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table className="table">
      <thead>
        <tr>
          <th className='w-44'>순위</th>
          <th>이름</th>
          {rankType === 'score' && 
          <th className='w-2xs'>
            <div className=' flex items-center gap-1 justify-end'>
              <Medal className='w-4 h-4 text-success' />
              <span>점수</span>
            </div>
          </th>
          }
          {rankType === 'streak' && 
          <th className='w-2xs'>
            <div className='flex items-center gap-1 justify-end'>
              <Calendar className='w-4 h-4 text-success'/>
              <span>최장 스트릭</span>
            </div>
          </th>
          }
          {rankType === 'count' && 
          <th className='w-2xs'>
            <div className='flex items-center gap-1 justify-end'>
              <Medal className='w-4 h-4 text-success' />
              <span>푼 문제 수</span>
            </div>
          </th>
          }
        </tr>
      </thead>
    <tbody>
      { datas.type === 'group' ? (
        datas.groupDatas.map((data,idx)=>(
          <tr onClick={(e)=>{
            e.preventDefault()
            navigate(`/groups/${data._id}`)
          }} key={idx} className={`cursor-pointer hover:bg-base-300 ${idx===0 ? 'text-warning' : idx === 1 ? 'text-accent' : idx == 2 ? 'text-primary' : '' }`}>
            <th>{idx + 1}</th>
            <td className='flex items-center gap-1.5'>
                <div className='avatar'>
                  <div className="w-4 rounded-full"><img src={getAvatarUrl(data._id)} alt="group_img" />
                  </div>
                </div>
                <span>{data.groupName}</span></td>
            {'score' in data && <td><span className='flex justify-end'>{data.score.toLocaleString()}점</span></td>}
            {'maxStreak' in data && <td><span className='flex justify-end'>{data.maxStreak.toLocaleString()}일</span></td>}
            {'count' in data && <td><span className='flex justify-end'>{data.count.toLocaleString()}개</span></td>}
          </tr>
        )) 
      )
      :(
        datas.userDatas.map((data,idx) => (
          <tr key={idx} className={`hover:bg-base-300 ${idx===0 ? 'text-warning' : idx === 1 ? 'text-accent' : idx == 2 ? 'text-primary' : '' }`}>
            <th>{idx + 1}</th>
            <td className='flex items-center gap-1.5'>
              {data.imgSrc && <div className='avatar'>
                  <div className="w-4 rounded-full"><img src={data.imgSrc} alt="group_img" />
                  </div>
              </div>}
              <Link target='_blank' to={`https://solved.ac/profile/${data.name}`}><span>{data.name}</span></Link>
            </td>
            {'score' in data && <td><span className='flex justify-end'>{data.score.toLocaleString()}점</span></td>}
            {'maxStreak' in data && <td><span className='flex justify-end'>{data.maxStreak.toLocaleString()}일</span></td>}
            {'count' in data && <td><span className='flex justify-end'>{data.count.toLocaleString()}개</span></td>}
          </tr>
        ))
      )
    }
    </tbody>
    </table>
    </div>
  )

}


export default RankTable