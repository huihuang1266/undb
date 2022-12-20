import type { ISelectFilter, ISelectFilterOperator } from '../filter'
import { Options } from '../option/options'
import { BaseField } from './field.base'
import type { ISelectField } from './field.type'
import { SelectFieldValue } from './select-field-value'
import type { ICreateSelectFieldInput, ICreateSelectFieldValue, SelectFieldType } from './select-field.type'
import { FieldId, FieldName, FieldValueConstraints } from './value-objects'

export class SelectField extends BaseField<ISelectField> {
  get type(): SelectFieldType {
    return 'select'
  }

  get options() {
    return this.props.options
  }

  static create(input: ICreateSelectFieldInput): SelectField {
    return new SelectField({
      id: FieldId.from(input.id),
      name: FieldName.create(input.name),
      valueConstrains: FieldValueConstraints.create({ required: input.required }),
      options: Options.create(input.options),
    })
  }

  static unsafeCreate(input: ICreateSelectFieldInput): SelectField {
    return new SelectField({
      id: FieldId.from(input.id),
      name: FieldName.unsafaCreate(input.name),
      valueConstrains: FieldValueConstraints.unsafeCreate({ required: input.required }),
      options: Options.unsafeCreate(input.options),
    })
  }

  createFilter(operator: ISelectFilterOperator, value: string | null): ISelectFilter {
    return { operator, value, path: this.name.value, type: 'select' }
  }

  createValue(value: ICreateSelectFieldValue): SelectFieldValue {
    return new SelectFieldValue(value)
  }
}
