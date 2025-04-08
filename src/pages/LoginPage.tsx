import { useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from "@tanstack/react-query"
import { authLogin } from "@/apis/apis"

export interface LoginFromData{
  handle : string
  password : string
}

// const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/
  
export interface LoginResponse{
  success : boolean
  message ?: string
}

const userSchema = z.object({
  handle : z
    .string()
    .min(2, {message : '닉네임은 2글자 이상입니다.'}),
  password : z
    .string()
    .min(8, {message: '비밀번호는 8글자 이상입니다.'})
    // .regex(passwordRegex, {message: "비밀번호는 영문, 숫자, 특수문자(~!@#$%^&*)가 모두 조합되어 있습니다다."}),
})

type userType = z.infer<typeof userSchema>

function LoginPage(){
  const [errorMessage, setErrorMesssage] = useState<string>('')
  const { register, handleSubmit, formState:{errors} } = useForm<userType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      handle: "",
      password: "",
    }
  })

  const mutation = useMutation({
    mutationKey: [`Login`],
    mutationFn: authLogin,
  })

  const loginHandler = useCallback((inputData:LoginFromData)=>{
    mutation.mutate(inputData, {
        onSuccess: (data) => {
          console.log(data)
          if (data.success === true){
            
          }
          else{
            setErrorMesssage(data.message ? data.message : '')
          }
        }
      })

  },[])
  return (
    <div className="h-screen -mt-16 flex items-center justify-center">
      <form className="fieldset w-md bg-base-200 border border-base-300 p-6 rounded-box" onSubmit={handleSubmit(loginHandler)}>
        <div className="flex justify-center">
          <h2 className="text-2xl font-semibold">로그인 하기</h2>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <label className="fieldset-label" >solved.ac ID</label>
            <input type="text" className="input w-full" placeholder="solved.ac ID" {...register('handle')} />
            {errors.handle && (<span className="fieldset-label">{errors.handle.message}</span>)}
          </div>
          <div className="flex flex-col gap-2">
            <label className="fieldset-label">Password</label>
            <input type="password" className="input w-full" placeholder="password"{...register('password')}/>
            {errors.password && (<span className="fieldset-label">{errors.password.message}</span>)}
          </div>
          {errorMessage && <span className="text-error text-sm font-semibold ml-0.5 self-center">{errorMessage}</span>}
          <input type="submit" value="Login" className="btn btn-primary mt-4" />
        </div>
      </form>
    </div>
  )
}

export default LoginPage