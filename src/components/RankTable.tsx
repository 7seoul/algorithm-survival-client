import { getAvatarUrl } from '@/apis/apis'
import { Calendar, Medal } from 'lucide-react'
import { useNavigate } from 'react-router'
import { GroupRank, MemberType } from '@/types/GroupType'

interface groupTableProps {
  datas : {
    type : 'group',
    groupDatas : Array<GroupRank>
  } | {
    type : 'user',
    userDatas : Array<MemberType>
  }
}





function RankTable({...props} : groupTableProps){
  const navigate = useNavigate()
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table className="table">
      <thead>
        <tr>
          <th>순위</th>
          <th>이름</th>
          <th>
            <div className='flex items-center gap-1 justify-end'>
              <Medal className='w-4 h-4 text-success' />
              <span>점수</span>
            </div>
          </th>
          <th>
            <div className='flex items-center gap-1 justify-end'>
              <Calendar className='w-4 h-4 text-success'/>
              <span>스트릭</span>
            </div>
          </th>
        </tr>
      </thead>
    <tbody>
      { props.datas.type === 'group' ? (
        props.datas.groupDatas.map((data,idx)=>(
          <tr onClick={(e)=>{
            e.preventDefault()
            navigate(`/groups/${data._id}`)
          }} key={idx} className={`cursor-pointer hover:bg-base-300 ${idx===0 ? 'text-warning' : idx === 1 ? 'text-accent' : idx == 2 ? 'text-primary' : '' }`}>
            <th>{idx + 1}</th>
            <td>
                <div className='avatar'>
                  <div className="w-4 rounded-full"><img src={getAvatarUrl(data._id)} alt="group_img" />
                  </div>
                </div>
                <span>{data.groupName}</span></td>
            <td><span className='flex justify-end'>{data.score.toLocaleString()}</span></td>
            <td><span className='flex justify-end'>{data.maxStreak.toLocaleString()}</span></td>
          </tr>
        )) 
      )
      :(
        props.datas.userDatas.map((data,idx) => (
          <tr key={idx} className={`hover:bg-base-300 ${idx===0 ? 'text-warning' : idx === 1 ? 'text-accent' : idx == 2 ? 'text-primary' : '' }`}>
            <th>{idx + 1}</th>
            <td>{data.name}</td>
            <td><span className='flex justify-end'>{data.score.toLocaleString()}</span></td>
            <td><span className='flex justify-end'>{data.streak.toLocaleString()}</span></td>
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