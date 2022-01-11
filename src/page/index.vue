<script lang="tsx">
import WrapCardTable from './wrapTable.vue'
import QueryForm from './queryForm.vue'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { cloneDeep } from 'lodash'
import setState from './setState'
import { Paging, Column, TableConfig, QueryConfig } from './pageModel'

@Component({
  name: 'page',
  components: { WrapCardTable, QueryForm },
  mixins: [setState],
  data() {
    return {
      innerTableConfig: {}
    }
  },
  props: {
    isFirstLoad: {
      default() {
        return true
      }
    },
    inline: {
      default() {
        return true
      }
    }
  }
})
export default class Page<T, Search extends Record<string, any>> extends Vue {
  @Prop({
    required: true
  })
  tableConfig: TableConfig<T>

  @Prop({
    required: false
  })
  queryConfig: QueryConfig<Search>

  @Prop({
    required: false
  })
  onSearch: (
    query?: Search,
    paging?: Paging<T>
  ) => Promise<Paging<T> | Array<T>>

  @Watch('tableConfig', { deep: true })
  onTableConfigChange(newValue: TableConfig<T>) {
    this.setState({
      innerTableConfig: {
        ...this.innerTableConfig,
        ...newValue
      }
    })
  }

  innerTableConfig: TableConfig<T> = { columns: [], data: [] }

  created() {
    this.initTableConfig()
    if (this.queryConfig) {
      this.initQueryForm()
    }
  }

  initQueryForm() {
    this.queryConfig.form = Object.assign(
      {},
      { ...this.queryConfig.form }
    ) as Search
    if (this.queryConfig.items.length) {
      for (const item of this.queryConfig.items) {
        const { prop, value } = item
        if (
          this.queryConfig.form &&
          !Object.keys(this.queryConfig!.form).includes(prop as string)
        ) {
          this.$set(this.queryConfig!.form, `${prop}`, value ? value : '')
        }
      }
    }
  }

  initTableConfig() {
    const newTableConfig =
      this.tableConfig.isPaging === false
        ? { ...this.tableConfig }
        : {
            isPaging: true,
            total: 0,
            paging: { pageNo: 1, pageSize: 10 },
            ...this.tableConfig
          }

    this.innerTableConfig = {
      data: [],
      ...newTableConfig
    }
  }

  mounted() {
    if (this.$props.isFirstLoad) {
      this.load()
    }
  }

  renderQueryForm() {
    return this.queryConfig ? (
      <QueryForm
        config={this.queryConfig}
        scopedSlots={this.$scopedSlots}
      ></QueryForm>
    ) : (
      <div class="user-filter">{this.$slots.filter}</div>
    )
  }

  async load() {
    if (!this.onSearch) {
      return
    }
    this.innerTableConfig.loading = true
    const data = await this.onSearch(
      this.queryConfig ? (this.queryConfig.form as Search) : undefined,
      this.innerTableConfig.paging ? this.innerTableConfig.paging : undefined
    )
    if (data) {
      const { isPaging } = this.innerTableConfig
      if (isPaging) {
        this.setState({
          innerTableConfig: {
            ...this.innerTableConfig,
            data: cloneDeep((data as Paging<T>).records),
            total: (data as Paging<T>).total,
            loading: false
          }
        })
      } else {
        this.setState({
          innerTableConfig: {
            ...this.innerTableConfig,
            loading: false,
            data
          }
        })
      }
    } else {
      this.setState({
        innerTableConfig: {
          ...this.innerTableConfig,
          data: [],
          loading: false
        }
      })
    }
  }

  render() {
    const { inline } = this.$props
    return (
      <rv-card class="box-card">
        <div class="prefix">{this.$slots.prefix}</div>
        <div class="page-header">{this.$slots.header}</div>
        <div class={inline ? 'filter inline' : 'filter'}>
          {this.renderQueryForm()}
          <div class="action-box">
            {this.$props.onSearch && (
              <rv-button
                type="primary"
                class="search-btn"
                {...{ on: { click: this.onSearchClick } }}
              >
                查询
              </rv-button>
            )}
            {this.$slots.filter_action}
          </div>
        </div>
        <rv-divider />
        <WrapCardTable
          config={this.innerTableConfig}
          scopedSlots={this.$scopedSlots}
          slots={this.$slots}
          {...{
            on: {
              'page-size': this.onPageSizeChange,
              'page-change': this.onPageChange
            }
          }}
        ></WrapCardTable>
        {this.$slots.default}
      </rv-card>
    )
  }

  onSearchClick() {
    if (this.innerTableConfig.isPaging) {
      this.innerTableConfig.paging!.pageNo = 1
    }
    this.load()
  }

  onPageChange(paging: Paging<T>) {
    this.innerTableConfig.paging!.pageNo = paging.pageNo
    this.innerTableConfig.paging!.pageSize = paging.pageSize
    this.$emit('pagingChange', this.innerTableConfig.paging)
    this.load()
  }

  onPageSizeChange(paging: Paging<T>) {
    this.innerTableConfig.paging!.pageNo = 1
    this.innerTableConfig.paging!.pageSize = paging.pageSize
    this.$emit('pagingChange', this.innerTableConfig.paging)
    this.load()
  }

  refreshTable() {
    this.load()
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  background: #ffffff;
  border: 1px solid rgba(46, 67, 105, 0.08);
  margin: 0 24px;
  box-shadow: unset;
  padding: 16px 24px;

  /deep/ .el-card__body {
    padding: 0px;
  }
}
.filter {
  margin: 0 5px 10px;
}
.filter.inline {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.action-box {
  display: flex;
  flex-wrap: auto;
  justify-content: flex-start;
  align-items: center;
}
</style>
