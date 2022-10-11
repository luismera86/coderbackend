/* eslint-disable no-undef */

import config from '../src/config/config.js'
import request from 'supertest'

const { PORT } = config

const server = `http://localhost:${PORT}`

describe('GET /user', () => {
  test('Debe responder con un status 200', async () => {
    const response = await request(server).get('/user')
    expect(response.statusCode).toBe(200)
  })
})
