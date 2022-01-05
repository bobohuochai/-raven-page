<script lang="tsx">
import { Component, Vue, Model, Prop } from 'vue-property-decorator'

@Component({
  name: 'form-item-select'
})
export default class FormItemSelect extends Vue {
  @Prop({
    type: Array
  })
  options: { value: string; label: string }[]

  @Model('change')
  innerValue: string | any

  render() {
    const { options } = this.$props
    if (!options || !options.length) {
      throw new Error('select 组件需配置options选项')
    }
    const { label, prop, ...rest } = this.$attrs
    return (
      <rv-form-item label={label} prop={prop}>
        <rv-select
          clearable
          style="width: 250px"
          value={this.innerValue}
          {...{
            props: rest,
            on: {
              change: (value: string) => {
                this.$emit('change', value)
              },
              ...this.$listeners
            }
          }}
        >
          {options.map((option: { value: string; label: string }) => (
            <rv-option
              key={option.value}
              value={option.value}
              label={option.label}
            ></rv-option>
          ))}
        </rv-select>
      </rv-form-item>
    )
  }
}
</script>
