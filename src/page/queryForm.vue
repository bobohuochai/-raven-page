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

@Component({
  name: 'query-form',
  components: {
    FormItemInput,
    FormItemSelect,
    FormItemDate,
    FormItemCheckboxGroup,
    FormItemRadioGroup
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
            {...{ props: rest, on }}
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
              props: rest,
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
              props: rest,
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
            {...{ props: rest, on }}
          />
        )
        break
      case formItemTypeEnum.DATE:
        result = (
          <form-item-date
            label={label}
            prop={prop}
            vModel={(form as T)[`${prop}`]}
            {...{ props: rest, on }}
          />
        )
        break
      case formItemTypeEnum.COMPONENT:
        result = (
          <rv-form-item label={label} prop={prop}>
            {h('div', [
              (this.$scopedSlots as any)[`${slot}`]({
                value: (form as T)[`${prop}`],
                form
              })
            ])}
          </rv-form-item>
        )
        break
    }
    return result
  }

  render(h: any) {
    const { $slots } = this
    let { inline, labelWidth, labelPosition, items, on, ...rest } = this.config
    if (!labelWidth) labelWidth = '100px'
    if (!labelPosition) labelPosition = 'left'
    if (!inline) inline = true
    return (
      <rv-form
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
      </rv-form>
    )
  }
}
</script>
<style lang="scss" scoped></style>
