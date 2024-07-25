import { Button, Input, ButtonBase } from '@mui/material'
import { FormEvent, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdPerson } from 'react-icons/md'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

import { useApi } from '@/api/react'
import { actions } from '@/store'
import css from './Login.module.scss'

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
      <div className={css.logo}>
        <MdPerson />
      </div>

      <div className={css.inputContainer}>
        <Input
          fullWidth
          name="password"
          className={css.input}
          type={isPassVisible ? 'text' : 'password'}
          onChange={() => setApiError('')}
        />

        <div className={css.passwordToggleVisible}>
          <ButtonBase
            type="button"
            onClick={() => setIsPassVisible((prev) => !prev)}
          >
            {isPassVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </ButtonBase>
        </div>

        {apiError && <p className={css.error}>{apiError}</p>}
      </div>

      <Button type="submit" variant="outlined" fullWidth>
        login
      </Button>
    </form>
  )
}

export default function Login() {
  return (
    <div className={css.CardContainer}>
      <div className={css.Card}>
        <Suspense
          fallback={<h1 style={{ textAlign: 'center' }}>Logging in...</h1>}
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
