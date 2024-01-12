import { Crypto } from '@/shared/utils/crypto'
import { Entity } from '../entity'
/*
  casos de teste:
    - criamos uma classe de Stub para ser o nosso objeto de testes

    - testar se está criando um uuid

    - se uuid é valido

    - se ao criar instancia passando uuid ele irá usar o nosso uuid

    -
*/
type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Teste abstract class Entity ', () => {
  const props = { prop1: 'value1', prop2: 10 }

  it('Should set props and id', () => {
    const stubEnity = new StubEntity(props)

    expect(stubEnity.props).toStrictEqual(props)
    expect(stubEnity._id).not.toBeNull()
    expect(Crypto.validateUUID(stubEnity.id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const id = Crypto.getUUID()
    const stubEnity = new StubEntity(props, id)

    expect(Crypto.validateUUID(stubEnity._id)).toBeTruthy()
    expect(stubEnity._id).toStrictEqual(id)
  })

  it('Should convert a entity to a Javascript Object', () => {
    const id = Crypto.getUUID()
    const stubEnity = new StubEntity(props, id)

    expect(stubEnity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
