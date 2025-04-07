import { getAvatarUrl } from '@/apis/apis'
import { GroupInfoType } from '@/types/GroupType'
import { Calendar, Medal, User } from 'lucide-react'

interface GroupInfoProps{
  data : GroupInfoType
}


function GroupInfoCard({data} : GroupInfoProps){
  return(
    <div className="card w-96 bg-base-100 card-xl shadow-sm">
      <figure className='avatar'>
        <div className="w-full rounded px-8 pt-8"><img src={getAvatarUrl(data._id)} alt="group_img" />
        </div>
      </figure>
      <div className="card-body gap-4">
        <div className='flex flex-col'>
          <h2 className="card-title">{data.groupName}</h2>
          <p className='text-base-content/70'>{data.description}</p>
        </div>
        <ul className='flex flex-col gap-2 items-center text-sm font-medium'>
          <li className="flex justify-between flex-row w-full">
            <div className='flex flex-row gap-1 items-center'>
              <User className='w-4 h-4 text-success'></User>
              <span>그룹장</span>
            </div>
            <span>{`${data.admin.name}`}</span>
          </li> 
          <li className="flex justify-between flex-row w-full">
            <div className='flex flex-row gap-1 items-center'>
              <User className='w-4 h-4 text-success'></User>
              <span>멤버수</span>
            </div>
            <span>{`${data.size}명`}</span>
          </li> 
          <li className="flex justify-between flex-row w-full">
            <div className='flex flex-row gap-1 items-center'>
              <Calendar className='w-4 h-4 text-success'></Calendar>
              <span>생성일</span>
            </div>
            <span>{`${new Date(data.createdAt).getFullYear()}년${new Date(data.createdAt).getMonth()}월${new Date(data.createdAt).getDate()}일`}</span>
          </li> 
          <li className="flex justify-between flex-row w-full">
            <div className='flex flex-row gap-1 items-center'>
              <Medal className='w-4 h-4 text-success'></Medal>
              <span>점수</span>
            </div>
            <span>{`${data.score}점`}</span>
          </li> 
          <li className="flex justify-between flex-row w-full">
            <div className='flex flex-row gap-1 items-center'>
              <Calendar className='w-4 h-4 text-success'></Calendar>
              <span>최대 스트릭</span>
            </div>
            <span>{`${data.maxStreak}일`}</span>
          </li> 
        </ul>
      </div>
    </div>
  )
}

export default GroupInfoCard