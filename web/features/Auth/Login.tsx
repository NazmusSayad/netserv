import { Button, Input, ButtonBase } from '@mui/material'
import { FormEvent, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import { useApi } from '@/api/react'
import { actions } from '@/store'

function LoginForm() {
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()
  const api = useApi({ suspense: true })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setApiError('')

    const password: string = e.target['password'].value
    const { ok, data, error } = await api.post('/auth/login', { password })

    if (!ok) {
      return setApiError(error)
    }

    if (data.jwt) {
      navigate('/')
      actions.auth.login(data.jwt)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="size-40 text-9xl bg-zinc-700 rounded-[50%] m-auto mb-10 grid place-content-center">
        <MdPerson />
      </div>

      <div className="relative mb-4">
        <Input
          fullWidth
          name="password"
          className="bg-zinc-800 py-1 px-2 pr-10"
          type={isPassVisible ? 'text' : 'password'}
          onChange={() => setApiError('')}
        />

        <div className="rounded-[50%] hidden absolute top-0 right-0">
          <ButtonBase
            className="p-3"
            type="button"
            onClick={() => setIsPassVisible((prev) => !prev)}
          >
            {isPassVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </ButtonBase>
        </div>

        {apiError && <p className="text-red-500 mt-1 text-sm">{apiError}</p>}
      </div>

      <Button type="submit" variant="outlined" fullWidth>
        login
      </Button>
    </form>
  )
}

export default function Login() {
  return (
    <div className="flex h-[inherit]">
      <div className="m-auto bg-zinc-900 p-12 pb-16 rounded-xl w-[min(25rem_95%)] shadow-[0.1rem_0.1rem_1rem_-0.5rem_black]">
        <Suspense
          fallback={<h1 className="text-4xl text-center">Logging in...</h1>}
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
