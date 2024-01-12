import { UserEntity, UserProps } from '../../user.entity'
import { UserDataBuilder } from '@/user/domain/testing/helpers/user-data-builder'

describe('Unit test for User entity', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = UserDataBuilder({})

    // Note: SUT -> System under Test, uma convenção estabelecida pela ISQTB onde nomeamos a entidade a set testada como "sut"
    sut = new UserEntity(props)
  })

  it('Constructor method', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter name', () => {
    expect(sut.name).toBeDefined()
    expect(sut.name).toEqual(props.name)
    expect(typeof sut.name).toBe('string')
  })

  it('Setter name', () => {
    sut['name'] = 'other name'
    expect(sut.name).toEqual('other name')
  })

  it('Getter email', () => {
    expect(sut.email).toBeDefined()
    expect(sut.email).toEqual(props.email)
    expect(typeof sut.email).toBe('string')
  })

  it('Getter password', () => {
    expect(sut.password).toBeDefined()
    expect(sut.password).toEqual(props.password)
    expect(typeof sut.password).toBe('string')
  })

  it('Setter password', () => {
    sut['password'] = '123456789'
    expect(sut.password).toEqual('123456789')
  })

  it('Getter createdAt', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toBeInstanceOf(Date)
  })

  it('Update  name  method', () => {
    sut.updateName('other name 2')
    expect(sut.name).toEqual('other name 2')
  })

  it('Update  password  method', () => {
    sut.updateName('985236417')
    expect(sut.name).toEqual('985236417')
  })
})
