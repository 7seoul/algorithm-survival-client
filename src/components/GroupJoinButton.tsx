import { joinGroup } from '@/apis/apis'
import { GroupInfoResponse } from '@/types/GroupType'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'


function GroupJoinButton({data}:{data: GroupInfoResponse}){
  const mutation = useMutation({
    mutationKey: [`joinGroup`],
    mutationFn: joinGroup,
  })
  const queryClient = useQueryClient()

  const handleClick = useCallback((e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    if (data.success === true) {
      mutation.mutate(data.group._id,{
        onSuccess: (res) => {
          if (res.success === true){
            alert('신청되었습니다.')
            queryClient.invalidateQueries({queryKey:[`group/info/${data.group._id}`]})
          }
          else{
            alert(res.message)
            console.log(res)
          }
  
        },
        onError: (err) => {
          console.log(err)
        }
      })
    }
    
  }
  ,[data])
  return (<>{mutation.isPending ? 
    <div className="flex w-full justify-center"><span className="loading loading-spinner loading-xl"></span></div> :
    <button className='w-fit btn btn-soft btn-success' onClick={handleClick}>그룹 신청하기</button>
}</>)
}

export default GroupJoinButton