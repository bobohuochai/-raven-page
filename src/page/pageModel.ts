import {
  Table,
  TableColumn,
  FormItem,
  Form,
  Select,
  Input,
  DatePicker
} from 'element-ui'

export interface Paging<T> {
  total?: number
  records?: Array<T>
  pageNo?: number
  pageSize?: number
}
export interface Column
  extends Partial<Omit<TableColumn, 'minWidth' | 'formatter'>> {
  slot?: string
  children?: Column[]
  minWidth?: number | string
  formatter?: any
}
export interface TableConfig<T>
  extends Partial<Omit<Table, 'data' | 'rowKey'>> {
  name?: string
  loading?: boolean
  data?: T[]
  columns: Column[]
  total?: number
  paging?: Paging<T>
  getRef?: (ref: Promise<any>) => void
  // Table Event
  on?: any
  isPaging?: boolean
  rowKey?: string
  [key: string]: any
}

export interface PageConfig {
  immediateSearch: boolean
}

export enum formItemTypeEnum {
  SELECT,
  INPUT,
  DATE,
  CHECKBOXGROUP,
  RADIOGROUP,
  COMPONENT,
  AMOUNTINPUT
}

export enum queryFormStyleMode {
  INLINE,
  Wrap
}

type formItemConfigType = FormItem | Select | Input | DatePicker

export interface FormItemConfig extends Partial<Omit<FormItem, 'prop'>> {
  type: formItemTypeEnum
  options?: Array<{ label: string; value: string }>
  slot?: string
  // FormItemInput Event
  on?: any
  prop: string
  value?: string | number | Date | any
  dateType?: string
  [key: string]: any
}

export interface QueryConfig<T extends Record<string, any>>
  extends Partial<Form> {
  items: FormItemConfig[]
  form?: T
  // Form Event
  on?: any
}
