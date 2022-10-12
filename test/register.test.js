/* eslint-disable no-undef */

import { describe, expect, test } from '@jest/globals'

import config from '../src/config/config.js'
import request from 'supertest'

const { PORT } = config

const server = `http://localhost:${PORT}`

describe('POST /register', () => {
  const mailNumberTest = Math.floor(Math.random() * 1000000)

  const user = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    phone: 123456789,
    age: 20,
    address: 'test',
    avatar: 'test',
    password: 'test',
  }

  test('Debe devolver un status 200 al enviar un usuario nuevo test', async () => {
    const response = await request(server)
      .post('/register')
      .send({ ...user, email: `test${mailNumberTest}@test.com` })
    expect(response.statusCode).toBe(200)
  })

  test('Debe devolver un error 302 si ya está el mail registrado en la base de datos', async () => {
    const response = await request(server).post('/register').send(user)
    expect(response.statusCode).toBe(302)
  })
})
