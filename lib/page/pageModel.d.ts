import { Table, TableColumn, FormItem, Form } from '@raven/cell';
export interface Paging<T> {
    total?: number;
    records?: Array<T>;
    pageNo?: number;
    pageSize?: number;
}
export interface Column extends Partial<TableColumn> {
    slot?: string;
}
export interface TableConfig<T> extends Partial<Omit<Table, 'data'>> {
    name?: string;
    loading?: boolean;
    data?: T[];
    columns: Column[];
    total?: number;
    paging?: Paging<T>;
    getRef?: (ref: Promise<any>) => void;
    on?: any;
    isPaging?: boolean;
}
export interface PageConfig {
    immediateSearch: boolean;
}
export declare enum formItemTypeEnum {
    SELECT = 0,
    INPUT = 1,
    DATE = 2,
    CHECKBOXGROUP = 3,
    COMPONENT = 4
}
export interface FormItemConfig extends Partial<Omit<FormItem, 'prop'>> {
    type: formItemTypeEnum;
    options?: Array<{
        label: string;
        value: string;
    }>;
    slot?: string;
    on?: any;
    prop: string;
    value?: string | number | Date | any;
}
export interface QueryConfig<T extends Record<string, any>> extends Partial<Form> {
    items: FormItemConfig[];
    form?: T;
    on?: any;
}
