# alpha-vpage
后台管理系统基础CRUD操作交互流程封装，组件依赖：
* vue 2.x
* Element UI 2.x

# Demo

### 1.注册组件

``` javascript

import Page from 'alpha-vpage'
import vue from 'vue'
vue.use(Page)


```

### 2.表格配置

``` javascript

  tableConfig = {
    columns: [
      {
        prop: 'selection',
        align: 'center',
        minWidth: '30px',
        type: 'selection'
      },
      { prop: 'clientId', label: 'Client ID' },
      { prop: 'name', label: '客户名称' },
      {
        prop: 'phone',
        label: '客户注册电话',
        formatter: this.phoneFormatter
      },
      { prop: 'email', label: '客户注册邮箱' },
      {
        prop: 'openTime',
        label: '开户时间',
        formatter: this.dateFormatter,
        sortable: true
      },
      {
        prop: 'expiryDate',
        label: '到期时间',
        formatter: this.dateFormatter
      },
      {
        prop: 'userStatus',
        label: '状态',
        formatter: this.statusFormatter
      }
    ],
    on: {
      'select-all': this.handleSelectionChange,
      'selection-change': this.handleSelectionChange
    }
  }

```

### 3.查询筛选配置

``` javascript
 queryFormConfig: QueryConfig<filterFormType> = {
    form: {},
    items: [
      {
        // 属性 必填
        prop: 'clientId',
        // 标签
        label: '客户ID',
        // 类型
        type: formItemTypeEnum.INPUT,
        // 监听事件，参考element-ui 该类型组件（现在是input可监听事件
        on: {
          change: this.clientIdChange
        },
        // 初始值
        value: 'init'
        // 剩余配置参数可参考element-ui 该类型（现在是input)组件可配置属性
      },
      {
        prop: 'name',
        label: '客户名称',
        type: formItemTypeEnum.INPUT
      },
      {
        prop: 'userStatus',
        label: '状态',
        type: formItemTypeEnum.SELECT,
        options: [
          { label: USER_STATUS.normal, value: 'normal' },
          { label: USER_STATUS.expired, value: 'expired' }
        ],
        value: 'normal'
      },
      {
        prop: 'phone',
        label: '手机号',
        type: formItemTypeEnum.COMPONENT,
        slot: 'q-phone'
      },
      {
        prop: 'email',
        label: '客户注册邮箱',
        type: formItemTypeEnum.INPUT
      },
      {
        prop: 'date',
        label: '测试时间',
        type: formItemTypeEnum.DATE,
        value: new Date()
      }
    ]
  }

```

### 4.html 模版

``` html
  <av-page
      :tableConfig="tableConfig"
      :queryConfig="queryFormConfig"
      :onSearch="search"
    >
      <template v-slot:q-phone="{ form }">
        
      </template>
      <template v-slot:c-orderId="{ row }">
        {{ `test column slot ${row.orderId}` }}
      </template>
    </av-page>

```

### 结果

 ![avatar](https://cdn17.pingpongx.com/static_platform/rvPage.png)



# 内容
* ~~查询筛选~~ 
  
查询Form Item 类型支持：

``` javascript

  export enum formItemTypeEnum {
  SELECT,
  INPUT,
  DATE,
  CHECKBOXGROUP,
  RADIOGROUP,
  COMPONENT
  }

```

查询Form Item 配置方法：

``` javascript

     {
        // 属性 必填
        prop: 'clientId',
        // 标签
        label: '客户ID',
        // 类型
        type: formItemTypeEnum.INPUT,
        // 监听事件，参考element-ui 该类型组件（现在是input可监听事件
        on: {
          change: this.clientIdChange
        },
        // 初始值
        value: 'init'
        // 剩余配置参数可参考element-ui 该类型（现在是input)组件可配置属性
      }

```

* ~~表格分页排序~~
* 弹出窗新增，批量新增（todo）
* 修改，表格直接修改，批量修改，excel修改模式（todo)
