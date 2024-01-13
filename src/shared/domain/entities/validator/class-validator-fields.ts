import { validateSync } from 'class-validator'
import { FieldsErrors, ValidatorFields } from './validator-fields.interface'

class ClassValidatorFields<PropsValidate>
  implements ValidatorFields<PropsValidate>
{
  errors: FieldsErrors = null
  validatedData: PropsValidate = null

  validate(data: any): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      this.errors = {}
      for (const error of errors) {
        this.errors[error.property] = Object.values(error.constraints)
      }
    } else {
      this.validatedData = data
    }

    return !errors.length
  }
}

export default ClassValidatorFields
