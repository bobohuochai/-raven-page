<script lang="tsx">
import { Component, Vue, Model, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'form-item-radio-group'
})
export default class FormItemRadioGroup extends Vue {
  @Prop({
    type: Array
  })
  options: { value: string; label: string }[]

  @Prop({
    type: String
  })
  initValue: string

  innerValue = ''

  @Watch('initValue', { immediate: true })
  onChangeInnerValueChange(value: string) {
    this.innerValue = this.initValue
  }

  render() {
    const { options } = this.$props
    if (!options || !options.length) {
      return
    }
    const { label, prop, ...rest } = this.$attrs
    return (
      <rv-form-item label={label} prop={prop}>
        <rv-radio-group
          clearable
          vModel={this.innerValue}
          {...{
            attrs: rest,
            on: {
              ...this.$listeners,
              change: (value: string) => {
                this.$emit('update:value', value)
                this.$emit('change', value)
              }
            }
          }}
        >
          {options.map((option: { value: string; label: string }) => (
            <rv-radio key={option.value} label={option.value}>
              {option.label}
            </rv-radio>
          ))}
        </rv-radio-group>
      </rv-form-item>
    )
  }
}
</script>
