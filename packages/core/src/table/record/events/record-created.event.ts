import { BaseEvent } from '@undb/domain'
import type { Table } from '../../table.js'
import type { IRecordReadable } from '../record.readable.js'
import { recordReadableMapper } from '../record.readable.js'
import type { IQueryRecordSchema } from '../record.type.js'
import type { BaseRecordEventName, IBaseRecordEventPayload } from './base-record.event.js'

export const EVT_RECORD_CREATED = 'record.created' as const

interface IRecordCreatedEventPayload extends IBaseRecordEventPayload {
  record: IRecordReadable
}

export class RecordCreatedEvent extends BaseEvent<IRecordCreatedEventPayload, BaseRecordEventName> {
  public readonly name = EVT_RECORD_CREATED

  static from(table: Table, operatorId: string, record: IQueryRecordSchema): RecordCreatedEvent {
    const recordValues = recordReadableMapper(table.schema.fields, record)
    return new this({ tableId: table.id.value, tableName: table.name.value, record: recordValues }, operatorId)
  }
}