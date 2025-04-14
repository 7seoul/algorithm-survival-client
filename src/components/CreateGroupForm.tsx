import { createGroup } from '@/apis/apis'
import { useCallback, useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

const groupSchema = z.object({
  groupName : z
    .string()
    .min(2, {message : '그룹이름은 2글자 이상입니다.'}),
  description : z
    .string()
    .min(8, {message: '설명은 8글자 이상입니다.'})
})

type groupType = z.infer<typeof groupSchema>

function CreateGroupForm(){
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { register, handleSubmit, formState:{errors} } = useForm<groupType>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      groupName: "",
      description: "",
    }
  })
  const mutation = useMutation({
      mutationKey: [`craeteGroup`],
      mutationFn: createGroup,
    })

  const createGroupHandler = useCallback((inputData:groupType)=>{
    mutation.mutate(inputData, {
      onSuccess: (data)=>{
        if (data.success === true){
          alert('성공적으로 생성되었습니다.')
          navigate(`/groups/${data.group._id}`)
        }
        else{
          setErrorMessage('그룹 생성에 실패했습니다.')
        }
      },
      onError: (_)=>{
        setErrorMessage('그룹 생성에 실패했습니다.')
      }
    })
  },[])

  return(
    <div className="flex items-center justify-center">
      <form className="fieldset w-md p-6 rounded-box" onSubmit={handleSubmit(createGroupHandler)}>
        <div className="flex justify-center">
          <h2 className="text-2xl font-semibold">그룹 생성하기</h2>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <label className="fieldset-label" >그룹 이름</label>
            <input type="text" className="input w-full" placeholder="그룹 이름" {...register('groupName')} />
            {errors.groupName && (<span className="fieldset-label">{errors.groupName.message}</span>)}
          </div>
          <div className="flex flex-col gap-2">
            <label className="fieldset-label">그룹 설명</label>
            <textarea className="textarea w-full h-56 resize-none" placeholder="그룹 설명"{...register('description')}/>
            {errors.description && (<span className="fieldset-label">{errors.description.message}</span>)}
          </div>
          {errorMessage && <span className="text-error text-sm font-semibold ml-0.5 self-center">{errorMessage}</span>}
          <input type="submit" value="생성하기" className="btn btn-soft btn-success mt-4" />
        </div>
      </form>
    </div>
  )
}

export default CreateGroupForm
