<script lang="tsx">
const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { QueryConfig, formItemTypeEnum, FormItemConfig } from './pageModel'
import FormItemInput from './formItem/input.vue'
import FormItemSelect from './formItem/select.vue'
import FormItemDate from './formItem/date.vue'
import FormItemCheckboxGroup from './formItem/checkboxgroup.vue'
import FormItemRadioGroup from './formItem/radiogroup.vue'
import FormItemAmountInput from './formItem/amountInput.vue'
import { omit } from 'lodash'

@Component({
  name: 'query-form',
  components: {
    FormItemInput,
    FormItemSelect,
    FormItemDate,
    FormItemCheckboxGroup,
    FormItemRadioGroup,
    FormItemAmountInput
  },
  props: {
    config: {
      default() {
        return true
      }
    }
  }
})
export default class QueryForm<T extends Record<string, any>> extends Vue {
  @Prop({
    required: true
  })
  config: QueryConfig<T>

  renderFormItem(h: any, item: FormItemConfig) {
    const { form } = this.config
    const { type, prop, label, value, options, on, slot, ...rest } = item
    let result
    switch (type) {
      case formItemTypeEnum.SELECT:
        result = (
          <form-item-select
            label={label}
            prop={prop}
            vModel={(form as T)[`${prop}`]}
            options={options}
            {...{ attrs: rest, on }}
          />
        )
        break
      case formItemTypeEnum.CHECKBOXGROUP:
        result = (
          <FormItemCheckboxGroup
            prop={prop}
            label={label}
            initValue={(form as T)[`${prop}`]}
            options={options}
            {...{
              attrs: rest,
              on: {
                'update:value': function (value: string[]) {
                  ;(form as any)[`${prop}`] = value
                },
                ...on
              }
            }}
          ></FormItemCheckboxGroup>
        )
        break
      case formItemTypeEnum.RADIOGROUP:
        result = (
          <FormItemRadioGroup
            prop={prop}
            label={label}
            initValue={(form as T)[`${prop}`]}
            options={options}
            {...{
              attrs: rest,
              on: {
                'update:value': function (value: string) {
                  ;(form as any)[`${prop}`] = value
                },
                ...on
              }
            }}
          ></FormItemRadioGroup>
        )
        break
      case formItemTypeEnum.INPUT:
        result = (
          <form-item-input
            label={label}
            prop={prop}
            vModel={(form as T)[`${prop}`]}
            {...{ attrs: rest, on }}
          />
        )
        break
      case formItemTypeEnum.DATE:
        result = (
          <form-item-date
            label={label}
            prop={prop}
            initValue={(form as T)[`${prop}`]}
            dateType={(rest as any).dateType}
            {...{
              attrs: omit(rest, 'dateType'),
              on: {
                'update:value': function (value: string) {
                  ;(form as any)[`${prop}`] = value
                },
                ...on
              }
            }}
          />
        )
        break
      case formItemTypeEnum.COMPONENT:
        result = (
          <el-form-item label={label} prop={prop}>
            {h('div', [
              (this.$scopedSlots as any)[`${slot}`]({
                value: (form as T)[`${prop}`],
                form
              })
            ])}
          </el-form-item>
        )
        break
      case formItemTypeEnum.AMOUNTINPUT:
        result = (
          <form-item-amount-input
            label={label}
            prop={prop}
            vModel={(form as T)[`${prop}`]}
            {...{
              attrs: rest,
              on: {
                'update:value': function (value: number) {
                  ;(form as any)[`${prop}`] = value
                },
                ...on
              }
            }}
          />
        )
        break
    }
    return result
  }

  render(h: any) {
    const { $slots } = this
    let { inline, labelWidth, labelPosition, items, on, ...rest } = this.config
    if (!labelWidth) labelWidth = 'auto'
    if (!labelPosition) labelPosition = 'right'
    if (!inline) inline = true
    return (
      <el-form
        ref="queryForm"
        inline={inline}
        labelWidth={labelWidth}
        labelPosition={labelPosition}
        {...{ props: { ...rest }, on }}
      >
        {items.length &&
          items.map((formItem: FormItemConfig) =>
            this.renderFormItem(h, formItem)
          )}
        {$slots.default}
      </el-form>
    )
  }
}
</script>
<style lang="scss" scoped></style>
