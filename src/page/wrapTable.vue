<script lang="tsx">
const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import setState from './setState'
import { Paging, TableConfig, Column } from './pageModel'

@Component({
  name: 'wrap-card-table',
  mixins: [setState]
})
export default class WrapCardTable<T> extends Vue {
  pageSizes = [10, 15, 25, 50]

  @Prop({
    required: true,
    default: {
      columns: [],
      data: []
    }
  })
  config: TableConfig<T>

  @Prop()
  getRef: (ref: any) => void

  getInnerTable() {
    return this.$refs['wrapCardTable']
  }

  onPageChangeHandler(pageNo: number) {
    this.$emit('page-change', {
      pageNo,
      pageSize: this.config.paging!.pageSize
    })
  }

  onPageSizeHandler(pageSize: number) {
    this.$emit('page-size', {
      pageSize,
      pageNo: this.config.paging!.pageNo
    })
  }

  @Watch('config', { deep: true })
  onWatchConfig(val: TableConfig<T>) {
    if (val) {
      this.$forceUpdate()
    }
  }

  convertInnerPropToKebabCase(object: any) {
    Object.keys(object).forEach((key: string) => {
      const kebabCaseKey = kebabCase(key)
      if (kebabCaseKey !== key) {
        object[kebabCaseKey] = object[key]
        delete object[key]
      }
    })
    return object
  }

  renderColumn(h: any, column: Column) {
    const { prop, label, children, slot, ...rest } = column
    const innerColumnProps = this.convertInnerPropToKebabCase(rest)
    const slotColumn = (
      <rv-table-column
        key={prop}
        prop={prop}
        label={label}
        {...{
          attrs: innerColumnProps,
          scopedSlots: {
            default: (scopedSlot: any) => {
              return h('div', [
                (this.$scopedSlots as any)[`${slot}`]({
                  row: scopedSlot.row,
                  $index: scopedSlot.$index
                })
              ])
            }
          }
        }}
      >
        {children && children.length && this.renderChildrenColumns(h, children)}
      </rv-table-column>
    )
    const normalColumn = (
      <rv-table-column
        key={prop}
        prop={prop}
        label={label}
        {...{ attrs: innerColumnProps }}
      >
        {children && children.length && this.renderChildrenColumns(h, children)}
      </rv-table-column>
    )
    return column.slot ? slotColumn : normalColumn
  }

  renderChildrenColumns(h: any, children: Column[]) {
    return children.map((item: Column) => {
      return this.renderColumn(h, item)
    })
  }

  renderColumns(h: any) {
    return (
      this.config.columns &&
      this.config.columns.map((item: Column) => {
        return this.renderColumn(h, item)
      })
    )
  }

  renderPagination() {
    const isShow = (this.config as any).total >= 0 && this.config.paging
    const paging = (this.config as any).paging
    let innerPagingProps = {}
    if (paging) {
      const { pageNo, pageSize, ...rest } = paging
      innerPagingProps = this.convertInnerPropToKebabCase(rest)
    }
    const pageHtml = isShow ? (
      <rv-pagination
        class="page-container"
        layout="prev,pager,next,sizes,total,jumper"
        current-page={paging.pageNo}
        page-size={paging.pageSize}
        total={this.config.total}
        page-sizes={this.pageSizes}
        {...{
          props: innerPagingProps,
          on: {
            'current-change': this.onPageChangeHandler,
            'size-change': this.onPageSizeHandler
          }
        }}
      />
    ) : (
      ''
    )
    return isShow ? pageHtml : ''
  }

  render(h: any) {
    let { headerCellStyle, cellStyle } = this.config
    const { loading, data, columns, total, paging, on, ...rest } = this.config
    const innerTableProps = this.convertInnerPropToKebabCase(rest)
    const innerTableFuncs = on ? this.convertInnerPropToKebabCase(on) : {}
    const { slots } = this.$attrs
    if (!headerCellStyle) {
      headerCellStyle = {
        'text-align': 'center',
        'background-color': '#F5F5F5'
      }
    }
    if (!cellStyle) {
      cellStyle = { 'text-align': 'center' }
    }

    return (
      <div class="box-card">
        <div class="table-header">{(slots as any).tableHeader}</div>
        <div class="table-container" v-loading={this.config.loading}>
          <rv-table
            ref="wrapCardTable"
            data={this.config.data}
            border
            headerCellStyle={headerCellStyle}
            cellStyle={cellStyle}
            {...{ props: innerTableProps, on: innerTableFuncs }}
          >
            {this.renderColumns(h)}
          </rv-table>
          {this.renderPagination()}
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
  opacity: 0.65;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #2e4369;
  letter-spacing: -0.06px;
}
</style>
