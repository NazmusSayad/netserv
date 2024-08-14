import * as jwt from '../jwt'
import { createGenerator, WebAppOptions } from '../config'

export default createGenerator(function (config: WebAppOptions) {
  return {
    login(req, res) {
      if (!config.authEnabled) {
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
    },

    init(req, res) {
      const configResponse = {
        writable: config.writable,
        authEnabled: config.authEnabled,
      }

      if (!config.authEnabled) {
        res.json({ ...configResponse, jwt: null })
      }

      const jwtCookie = req.cookies.jwt

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

        res.json({ ...configResponse, jwt: newJwt })
      } else {
        res.json({ ...configResponse, jwt: null })
      }
    },

    checkAuthMiddleware(req, res, next) {
      if (!config.authEnabled) {
        return next()
      }

      const jwtCookie = req.cookies.jwt
      if (!jwtCookie) {
        return res.status(401).json({ error: 'No JWT cookie' })
      }

      try {
        jwt.verify(jwtCookie)
        next()
      } catch (err) {
        res.status(401).json({ error: 'Invalid JWT cookie' })
      }
    },
  }
})
