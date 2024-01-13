/*
  1. varificar se os campos errors e data são inicializados como nulos
  2. verificar quando os dados são invalidos se o formato de resposta está certo
*/

import ClassValidatorFields from '../../class-validator-fields'
import * as ClassValidator from 'class-validator'

class StubClassValidationFields extends ClassValidatorFields<{
  field: string
}> {}

describe('ClassValidatorFields - unit tests', () => {
  it('Should return errors and data as null', () => {
    const stub = new StubClassValidationFields()

    expect(stub.errors).toBeNull()
    expect(stub.validatedData).toBeNull()
  })

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(ClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'test faild' } },
    ])

    const stub = new StubClassValidationFields()

    expect(stub.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(stub.validatedData).toBeNull()
    expect(stub.errors).toStrictEqual({
      field: ['test faild'],
    })
  })

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(ClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])

    const stub = new StubClassValidationFields()

    expect(stub.validate({ field: 'test validated' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(stub.validatedData).toStrictEqual({ field: 'test validated' })
    expect(stub.errors).toBeNull()
  })
})
