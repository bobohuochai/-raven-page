<script lang="tsx">
import { Component, Vue, Model, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'form-item-checkbox-group'
})
export default class FormItemCheckboxGroup extends Vue {
  @Prop({
    type: Array
  })
  options: { value: string; label: string }[]

  @Prop({
    type: Array
  })
  initValue: []

  innerValue: string[] = []

  @Watch('initValue', { immediate: true })
  onChangeInnerValueChange(value: string[]) {
    this.innerValue = this.initValue
  }

  render() {
    const { options } = this.$props
    if (!options || !options.length) {
      return
    }
    const { label, prop, ...rest } = this.$attrs
    let { labelWidth } = this.$attrs
    if (!labelWidth) labelWidth = 'auto'
    return (
      <rv-form-item label={label} prop={prop} labelWidth={labelWidth}>
        <rv-checkbox-group
          clearable
          vModel={this.innerValue}
          {...{
            attrs: rest,
            on: {
              ...this.$listeners,
              change: (value: string[]) => {
                this.$emit('update:value', value)
                this.$emit('change', value)
              }
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
