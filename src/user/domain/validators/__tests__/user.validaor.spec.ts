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

  describe('Name field', () => {
    it('Invalidation cases for name field', () => {
      let isValid

      isValid = sut.validate(null as any)

      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({ ...UserDataBuilder({}), name: '' as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual(['name should not be empty'])

      isValid = sut.validate({ ...UserDataBuilder({}), name: 123 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ])

      isValid = sut.validate({
        ...UserDataBuilder({}),
        name: 'a'.repeat(256) as any,
      })
      expect(isValid).toBeFalsy()
      expect(sut.errors.name).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ])
    })

    it('Valid case for name field', () => {
      const data = UserDataBuilder({})
      const isValid = sut.validate(data)

      expect(isValid).toBeTruthy()
      expect(sut.validatedData).toStrictEqual(new UserRules(data))
      expect(sut.errors).toBeNull()
    })
  })
})
