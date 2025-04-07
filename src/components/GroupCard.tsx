import { Medal, Calendar, User } from 'lucide-react'
import { Link } from 'react-router'
import { groupType } from '@/types/GroupType'

interface GroupCardProps{
  data: groupType
}

function GroupCard({ data } : GroupCardProps ){
  return(
    <div className="card card-border bg-base-100 w-full">
        <Link to={`/groups/${data._id}`}>
        <div className="card-body gap-6">
          <div className='flex flex-row gap-3'>
            <figure className='avatar'>
              <div className="w-16 rounded"><img src={`https://gravatar.com/avatar/${data._id}?d=retro`} alt="group_img" />
              </div>
            </figure>
            <div className='flex flex-col gap-3 justify-center'>
              <h2 className="card-title">{data.groupName}</h2>
              {data.description && <p>{data.description}</p>}
            </div>
          </div>
            <div className="flex flex-row justify-between items-center">
              { data.size && <div className='flex-row flex gap-1 w-fit items-center'>
                <User className='w-4 h-4 text-success'></User>
                <span>{`${data.size}명`}</span>
              </div>}
              <ul className='flex-row flex gap-4 w-fit'>
                <li className='flex flex-row gap-1 items-center'>
                  <Medal className='w-4 h-4 text-success'></Medal>
                  <span>{`${data.maxStreak}일`}</span>
                </li>
                <li className='flex flex-row gap-1 items-center'>
                  <Calendar className='w-4 h-4 text-success'></Calendar>
                  <span>{`${data.score}점`}</span>
                  </li>
              </ul>
          </div>
        </div>
        </Link>
      </div>
  )
}

export default GroupCard