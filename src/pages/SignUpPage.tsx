import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from "@tanstack/react-query"
import { getSignUpToken, SignUp } from "@/apis/apis"
import { useAuthStore } from '@/stores/authStore'
import { Link, useNavigate } from 'react-router'
import { Copy } from 'lucide-react'


export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("사용할 닉네임을 입력해 주세요."),
    handle: z
      .string()
      .nonempty('Solved.ac 닉네임을 입력해 주세요.'),
    token: z.string().nonempty('토큰을 발급해주세요'),
    password: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요."
      ),
    passwordCheck: z.string().nonempty("비밀번호를 다시 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다.",
});

type registerType = z.infer<typeof registerSchema>

function SignUpPage(){
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isToken, setIsToken] = useState<boolean>(false)
  const { register, handleSubmit, getValues, formState:{errors}, setValue, setError } = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      handle: "",
      token: "",
      password: "",
      passwordCheck:""
    }
  })

  const SignUPTokenMutation = useMutation({
    mutationKey: ['signUpToken'],
    mutationFn: getSignUpToken
  })

  const SignUpMutation = useMutation({
    mutationKey: ['SignUp'],
    mutationFn: SignUp
  })
  const handleGetTokken = useCallback((e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    SignUPTokenMutation.mutate({handle : getValues('handle')}, {
      onSuccess: (data)=>{
        if (data.success === true){
          setValue('token',data.verificationCode)
          setIsToken(true)
          setError('handle',{message: ''})
        }
      },
      onError: (error, {handle}) => {
        console.log()
        if (error.response.status === 409){
          setError('handle', { type: '409', message: `${handle}은 이미 토큰이 발급된 닉네임 입니다.` })
        }
        else{
          setErrorMessage('오류가 발생했습니다.')
        }
      }
    })
  },[])

  const CopyHandler = useCallback(async ()=>{
    try{
      await navigator.clipboard.writeText(getValues('token'))
      setError('token', {message:'클립보드에 복사했습니다.'})
    }
    catch(e){
      setError('token', {message: '클립보드 복사에 실패했습니다.'})
    }
  },[])

  const SignUpHandler = useCallback((inputData:registerType)=>{
    SignUpMutation.mutate({
      name: inputData.name,
      handle: inputData.handle,
      password: inputData.password
    },{
      onSuccess: (data)=>{
        if (data.success === true){
          useAuthStore.setState({
            isLogin : true,
            userHandle : data.user.handle,
            userName : data.user.name,
          })
          alert('환영합니다.')
          navigate('/')
        }
        else{
          setErrorMessage(data.message)
        }
      },
      onError: (error)=>{
        if (error.response.status === 404){
          setErrorMessage('존재하지 않는 solved.ac 계정입니다.')
        }
        else if (error.response.status === 409){
          setErrorMessage('이미 존재하는 회원입니다.')
        }
        else{
          setErrorMessage('서버 에러')
        }
      }
    })
  },[SignUpMutation])
  return (
    <div className="h-screen -mt-16 flex items-center justify-center">
      <form className="fieldset w-md bg-base-200 border border-base-300 p-6 rounded-box" onSubmit={handleSubmit(SignUpHandler)}>
        <div className="flex flex-col justify-center items-center gap-3 py-3">
          <h2 className="text-2xl font-semibold">회원가입 하기</h2>
        </div>
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col">
            <label className="fieldset-label mb-1">solved.ac 닉네임</label>
            <div className='grid gap-2 grid-flow-col'>
              <input type="text" className={`input ${!isToken ? 'col-span-9' : 'w-full'}`} disabled={isToken} placeholder="solved.ac 닉네임" {...register('handle')} />
              {!isToken && <button onClick={handleGetTokken} className='btn col-span-1 btn-success '>키 발급</button>}
            </div>
            {errors.handle && (<span className="validator-hint opacity-70">{errors.handle.message}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="fieldset-label mb-1" >암호 키</label>
            <div className="relative">
              <input type="text" className="input w-full disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-none focus:outline-none focus:outline-offset-0" readOnly autoCapitalize='off' {...register('token')} />
              <Copy onClick={()=>{CopyHandler()}} className={`absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100 ${!isToken && 'hidden'}`} size={10}/>
            </div>
            {errors.token && (<span className="validator-hint opacity-70 mb-0.5">{errors.token.message}</span>)}
            <p className='fieldset-label mt-1'>암호키를 발급 후<Link className="link link-success opacity-80" target="_blank" to={`https://solved.ac/profile/${getValues('handle')}`}>solved.ac</Link> {' > 프로필 편집 > 소개란에 기입해주세요.'}</p>
          </div>
          <div className="flex flex-col">
            <label className="fieldset-label mb-1">닉네임</label>
            <input type="text" className="input w-full" placeholder="닉네임"{...register('name')}/>
            {errors.name && (<span className="validator-hint opacity-70">{errors.name.message}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="fieldset-label mb-1">비밀번호</label>
            <input type="password" className="input w-full" placeholder="비밀번호"{...register('password')}/>
            {errors.password && (<span className="validator-hint opacity-70">{errors.password.message}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="fieldset-label mb-1">비밀번호 확인</label>
            <input type="password" className="input w-full" placeholder="비밀번호 확인"{...register('passwordCheck')}/>
            {errors.passwordCheck && (<span className="validator-hint opacity-70">{errors.passwordCheck.message}</span>)}
          </div>
          {errorMessage && <span className="text-error text-sm font-semibold ml-0.5 self-center">{errorMessage}</span>}
          { !SignUpMutation.isPending && <input type="submit" value="SignUp" className="btn btn-success mt-4"/>}
          { SignUpMutation.isPending && <div className="flex w-full justify-center"><span className="loading loading-spinner loading-xl"></span></div>}
        </div>
      </form>
    </div>
  )
}

export default SignUpPage