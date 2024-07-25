import app from './express'
import * as jwt from './jwt'
import { authRouter, staticRouter } from './router'

export function generateApp(config: WebAppOptions) {
  const authEnabled = !!config.password

  if (authEnabled) {
    authRouter.post('/login', (req, res) => {
      console.log('Login attempt:', req.body.password)
      console.log('Correct password', config.password)

      if (!config.password) {
        return res.status(400).json({ error: 'No login needed!' })
      }

      if (!req.body.password) {
        return res.status(400).json({ error: 'No password provided' })
      }

      if (req.body.password === config.password) {
        const jwtToken = jwt.create({})
        res.cookie('jwt', jwtToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        })

        res.json({ jwt: jwtToken })
      } else {
        res.status(401).json({ error: 'Invalid password' })
      }
    })
  }

  authRouter.get('/init', (req, res) => {
    console.log('Authenticating with password:', authEnabled)

    if (!authEnabled) {
      res.json({ authEnabled, jwt: null })
    }

    const jwtCookie = req.cookies.jwt
    console.log('JWT Cookie:', jwtCookie)

    let jwtCookieValid = false
    if (jwtCookie) {
      try {
        jwt.verify(jwtCookie)
        jwtCookieValid = true
      } catch (err) {
        res.clearCookie('jwt')
      }
    }

    if (jwtCookieValid) {
      const newJwt = jwt.create({})
      res.cookie('jwt', newJwt, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })

      res.json({ authEnabled, jwt: newJwt })
    } else {
      res.json({ authEnabled, jwt: null })
    }
  })

  // Add routes to app
  app.get('/', (req, res, next) => {
    res.redirect('/@')
    next()
  })
  app.use('/api/auth', authRouter)
  app.use('/@', staticRouter)
}

export type WebAppOptions = {
  root: string
  port: number
  password?: string
  host?: string
  qr: boolean
}
