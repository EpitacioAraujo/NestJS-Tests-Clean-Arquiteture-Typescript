import { UserDataBuilder } from '../../testing/helpers/user-data-builder'
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../user.validator'

let sut: UserValidator

describe('User validator - unit test', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
  })

  describe('Name field - Invalidation cases', () => {
    const props = UserDataBuilder({})
    let isValid

    it('All rules are reproved', () => {
      props.name = null as any
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])
    })

    it('No empty rule', () => {
      props.name = '' as any
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual(['name should not be empty'])
    })

    it('Is a string rule', () => {
      props.name = 123 as any
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])
    })

    it('Max 255 characters rule', () => {
      props.name = 'a'.repeat(256)
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Email field - Invalidation cases', () => {
    const props = UserDataBuilder({})
    let isValid

    it('All rules are reproved', () => {
      props.email = null as any
      isValid = sut.validate(props)

      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual([
        'email should not be empty',
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])
    })

    it('No empty rule', () => {
      props.email = '' as any
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual([
        'email should not be empty',
        'email must be an email',
      ])
    })

    it('Is a string rule', () => {
      props.email = 123 as any
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual([
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ])
    })

    it('Max 255 length rule', () => {
      props.email = 'a'.repeat(256) as any
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })
  })

  describe('Password field - Invalidation cases', () => {
    const props = UserDataBuilder({})
    let isValid

    it('All rules are reproved', () => {
      props.password = null as any
      isValid = sut.validate(props)

      console.log(sut.errors.password)

      expect(isValid).toBeFalsy()
      expect(sut.errors.password).toStrictEqual([
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])
    })

    it('No empty rule', () => {
      props.password = '' as any
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.password).toStrictEqual([
        'password should not be empty',
      ])
    })

    it('Is a string rule', () => {
      props.password = 123 as any
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.password).toStrictEqual([
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ])
    })

    it('Max 255 length rule', () => {
      props.email = 'a'.repeat(256) as any
      isValid = sut.validate(props)
      expect(isValid).toBeFalsy()
      expect(sut.errors.email).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ])
    })
  })

  it('Valid case for user validator class', () => {
    const data = UserDataBuilder({})
    const isValid = sut.validate(data)

    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRules(data))
    expect(sut.errors).toBeNull()
  })
})
