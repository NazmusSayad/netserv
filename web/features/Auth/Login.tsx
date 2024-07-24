import { FormEvent, useState } from 'react'
import css from './Login.module.scss'
import { Button, Input, ButtonBase } from '@mui/material'
import { actions } from '@/store'
import { MdPerson } from 'react-icons/md'

export default function Login() {
  const [isPassVisible, setIsPassVisible] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const password: string = e.target['password'].value
    actions.auth.login(password)
  }

  return (
    <div className={css.CardContainer}>
      <div className={css.Card}>
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
            />

            <div className={css.passwordToggleVisible}>
              <ButtonBase
                type="submit"
                onClick={() => setIsPassVisible((prev) => !prev)}
              >
                ++
              </ButtonBase>
            </div>
          </div>

          <Button type="submit" variant="outlined" fullWidth>
            login
          </Button>
        </form>
      </div>
    </div>
  )
}
