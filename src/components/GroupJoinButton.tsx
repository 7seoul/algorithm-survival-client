import { joinGroup } from '@/apis/apis'
import { GroupInfoResponse } from '@/types/GroupType'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'


function GroupJoinButton({data}:{data: GroupInfoResponse}){
  const mutation = useMutation({
    mutationKey: [`joinGroup`],
    mutationFn: joinGroup,
  })

  const handleClick = useCallback((e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    mutation.mutate(data.group._id,{
      onSuccess: (res) => {
        if (res.success === true){
          console.log(res)
        }
        else{
          console.log(res)
        }
      },
      onError: (err) => {
        console.log(err)
      }
    })
  }
  ,[data])
  return <button className='w-fit btn btn-success' onClick={handleClick}>그룹 신청하기</button>
}

export default GroupJoinButton