import { Medal, Calendar, User } from 'lucide-react'
import { Link } from 'react-router'

interface groupCardProps{
  "_id" : Number,
  "groupName" : String,
  "description" : String,
  "score" : Number,
  "currentStreak" : Number,
  "size" : Number
}

function GroupCard({...props} : groupCardProps){
  return(
    <div className="card card-border bg-base-100 w-80">
        <Link to={`/groups/${props._id}`}>
        <div className="card-body gap-3">
          <div className='flex flex-row gap-3'>
            <figure className='avatar'>
              <div className="w-16 rounded"><img src={`https://gravatar.com/avatar/${props._id}?d=retro`} alt="group_img" />
              </div>
            </figure>
            <div className='flex flex-col gap-3'>
              <h2 className="card-title">{props.groupName}</h2>
              <p>{props.description}</p>
            </div>
          </div>
            <div className="flex flex-row justify-between items-center">
              <div className='flex-row flex gap-4 w-fit items-center'>
                <User className='w-4 h-4 text-success'></User>
                <span>{`${props.size}`}</span>
              </div>
              <ul className='flex-row flex gap-4 w-fit'>
                <li className='flex flex-row gap-1 items-center'>
                  <Medal className='w-4 h-4 text-success'></Medal>
                  <span>{`${props.currentStreak}`}</span>
                </li>
                <li className='flex flex-row gap-1 items-center'>
                  <Calendar className='w-4 h-4 text-success'></Calendar>
                  <span>{`${props.score}`}</span>
                  </li>
              </ul>
          </div>
        </div>
        </Link>
      </div>
  )
}

export default GroupCard