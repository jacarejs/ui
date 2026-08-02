import { describe, expect, it } from 'vitest'
import { pulse } from '@jacare/core'
import {
  createForm,
  getByPath,
  setByPath,
  validateRule,
  validateRules,
} from '../src/validation/index.js'

describe('validation engine', () => {
  it('validates required, email, min and pattern rules', async () => {
    expect(await validateRule({ required: true, message: 'Need name' }, '')).toBe('Need name')
    expect(await validateRule({ type: 'email', message: 'Bad email' }, 'nope')).toBe('Bad email')
    expect(await validateRule({ type: 'email' }, 'a@b.com')).toBe(null)
    expect(await validateRule({ min: 3, message: 'Too short' }, 'ab')).toBe('Too short')
    expect(await validateRule({ pattern: /^[A-Z]+$/, message: 'Caps only' }, 'Ab')).toBe('Caps only')
  })

  it('supports custom validators and trigger filtering', async () => {
    const message = await validateRule(
      {
        validator: (_rule, value, callback) => {
          if (value !== 'ok') callback(new Error('Nope'))
          else callback()
        },
      },
      'bad',
    )
    expect(message).toBe('Nope')

    const asyncMessage = await validateRule(
      {
        validator: async (_rule, value) => {
          if (value !== 'ok') throw new Error('Async no')
        },
      },
      'bad',
    )
    expect(asyncMessage).toBe('Async no')

    expect(
      await validateRules([{ required: true, message: 'Required', trigger: 'blur' }], '', {}, 'change'),
    ).toBe(null)
    expect(
      await validateRules([{ required: true, message: 'Required', trigger: 'blur' }], '', {}, 'blur'),
    ).toBe('Required')
    expect(
      await validateRules([{ required: true, message: 'Required', trigger: 'blur' }], '', {}, 'submit'),
    ).toBe('Required')
  })

  it('reads and writes nested model paths with pulses', () => {
    const model = {
      user: {
        name: pulse('Ada'),
      },
    }
    expect(getByPath(model, 'user.name')).toBe('Ada')
    setByPath(model, 'user.name', 'Grace')
    expect(model.user.name()).toBe('Grace')
  })

  it('createForm validates, resets and clears field errors', async () => {
    const model = {
      name: pulse(''),
      email: pulse('bad'),
    }
    const form = createForm({
      model,
      rules: {
        name: [{ required: true, message: 'Name required' }],
        email: [{ type: 'email', message: 'Email invalid' }],
      },
    })

    form.registerField('name', {
      getValue: () => model.name(),
      setError: () => {},
      rules: () => null,
      required: () => false,
      label: () => 'Name',
    })
    form.registerField('email', {
      getValue: () => model.email(),
      setError: () => {},
      rules: () => null,
      required: () => false,
      label: () => 'Email',
    })

    await expect(form.validate()).rejects.toMatchObject({
      fields: {
        name: [{ message: 'Name required' }],
        email: [{ message: 'Email invalid' }],
      },
    })
    expect(form.errors().name).toBe('Name required')
    expect(form.errors().email).toBe('Email invalid')

    model.name.set('Ada')
    model.email.set('ada@example.com')
    await expect(form.validate()).resolves.toBe(true)
    expect(form.errors()).toEqual({})

    form.setFieldValue('name', 'Temp')
    expect(model.name()).toBe('Temp')
    form.resetFields(['name'])
    expect(model.name()).toBe('')
    form.clearValidate()
    expect(form.errors()).toEqual({})
  })
})
