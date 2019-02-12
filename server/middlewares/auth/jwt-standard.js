'use strict'

const jsonwebtoken = require('jsonwebtoken')
const express = require('express')
const env = require('tiny-config')

const errCodes = require('../../../common-constants').errCodes
const ROUTE_PATHS = require('../../constants').ROUTES
const logger = require('../../../common-utils').logger

const jwtSecret = env.get('jwtSecret')

const defaultOptions = {
  algorithm: 'HS256',
  audience: 'healthera-admin',
  issuer: 'healthera',
  subject: 'session'
}

const HEALTHERA_COOKIE_NAME = 'SESSION_COOKIE'

const generateJWT = (payload, options = {
  expiresIn: 60 * 60
}) => {
  options = { ...defaultOptions, ...options }
  return jsonwebtoken.sign(payload, jwtSecret, options)
}

// always use this in try catch block ...
const verifyJWT = (token, options = {}) => {
  options = { ...defaultOptions, ...options }
  return jsonwebtoken.verify(token, jwtSecret, options)
}

const authorizationMiddleware = (req, res, next) => {
  const token = req.cookies(HEALTHERA_COOKIE_NAME)
  if (!token) {
    logger.warn('session token missing from cookie ...')
    return res.status(401).send({ errCode: errCodes.UNAUTHORIZED })
  }
  try {
    const payload = verifyJWT(token)
    req.jwtPayload = payload
    return next()
  } catch (e) {
    logger.warn('invalid token to authorize user ...', e.message)
    return res.status(401).send({ errCode: errCodes.UNAUTHORIZED })
  }
}

const setSession = (res, payload) => {
  res.cookie(HEALTHERA_COOKIE_NAME, generateJWT(payload), {
    domain: env.get('appHost'),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod'
  })
}

const allVerbs = express.Router().use(authorizationMiddleware)

module.exports = {
  middlewareRouter: [ // Add routes here for making them accessible only for loggedin user.
    { mountOn: ROUTE_PATHS.LOGOUT, middleware: allVerbs },
    { mountOn: ROUTE_PATHS.JOKE, middleware: allVerbs }
  ],
  setSession
}