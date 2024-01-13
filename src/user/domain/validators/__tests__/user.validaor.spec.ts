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
    let isValid

    it('All rules are reproved', () => {
      isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])
    })

    it('No empty rule', () => {
      isValid = sut.validate({ ...UserDataBuilder({}), name: '' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual(['name should not be empty'])
    })

    it('Is a string rule', () => {
      isValid = sut.validate({ ...UserDataBuilder({}), name: 123 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])
    })

    it('Max 255 characters rule', () => {
      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 'a'.repeat(256) as any,
      })
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

  it('Valid case for user validator class', () => {
    const data = UserDataBuilder({})
    const isValid = sut.validate(data)

    expect(isValid).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(new UserRules(data))
    expect(sut.errors).toBeNull()
  })
})
