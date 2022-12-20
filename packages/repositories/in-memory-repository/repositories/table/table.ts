import type { IRootFilter, IViewFieldOption } from '@egodb/core'
import type { ICurrencySymbol } from '@egodb/core/field/currency'

type NumberFieldInMemory = {
  id: string
  type: 'text'
  name: string
  required?: boolean
}

interface ICurrency {
  symbol: ICurrencySymbol
}

type TextFieldInMemory = {
  id: string
  type: 'number'
  name: string
  required?: boolean
  currency?: ICurrency
}

type DateFieldInMemory = {
  id: string
  type: 'date'
  name: string
  required?: boolean
}

type OptionInMemory = {
  name: string
}

type SelectFieldInMemory = {
  id: string
  type: 'select'
  name: string
  required?: boolean
  // FIXME: options should not be optional
  options?: OptionInMemory[]
}

export type SchemaInMemory = FieldInMemory[]

export type FieldInMemory = TextFieldInMemory | NumberFieldInMemory | DateFieldInMemory | SelectFieldInMemory

export type ViewInMemory = {
  name: string
  displayType: 'grid' | 'kanban'
  filter?: IRootFilter
  fieldOptions: Record<string, IViewFieldOption>
  fieldsOrder?: string[]
}

export type ViewsInMemory = ViewInMemory[]

export type TableInMemory = {
  id: string
  name: string
  schema: FieldInMemory[]
  views: ViewInMemory[]
}
