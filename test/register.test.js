/* eslint-disable no-undef */

import { addUser } from '../src/controllers/registerController.js'
import config from '../src/config/config.js'
import request from 'supertest'

const { PORT } = config

const server = `http://localhost:${PORT}`

describe('POST /register', () => {
  test('Debe devolver un status 201', async () => {
    const response = await request(addUser).post('/register').send()
    expect(response.statusCode).toBe(201)
  })
})
