<script lang="tsx">
import { Component, Vue, Model, Prop } from 'vue-property-decorator'

@Component({
  name: 'form-item-checkbox-group'
})
export default class FormItemCheckboxGroup extends Vue {
  @Prop({
    type: Array
  })
  options: { value: string; label: string }[]

  @Model('change')
  innerValue: string | any

  render() {
    const { options } = this.$props
    if (!options || !options.length) {
      throw new Error('checkbox group 组件需配置options选项')
    }
    const { label, prop, ...rest } = this.$attrs
    return (
      <rv-form-item label={label} prop={prop}>
        <rv-checkbox-group
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
            <rv-checkbox key={option.value} label={option.value}>
              {option.label}
            </rv-checkbox>
          ))}
        </rv-checkbox-group>
      </rv-form-item>
    )
  }
}
</script>
