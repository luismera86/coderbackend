import { describe, expect, test } from '@jest/globals'

import config from '../src/config/config.js'
import request from 'supertest'

const { PORT } = config

const server = `http://localhost:${PORT}`

describe('POST /login', () => {
  const user = {
    username: 'test@test.com',

    password: 'test',
  }
  test('Debe responder con un status 200 al tratar de hacer login con el usuario test', async () => {
    const response = await request(server).post('/login').send(user)
    console.log(user)
    expect(response.statusCode).toBe(200)
  })
})
