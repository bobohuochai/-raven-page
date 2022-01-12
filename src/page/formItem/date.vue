<script lang="tsx">
import { Component, Vue, Model, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'form-item-date'
})
export default class FormItemDate extends Vue {
  @Prop({})
  initValue: Date | string | null

  @Prop({
    type: String
  })
  dateType: string

  innerValue: Date | null = null

  @Watch('initValue', { immediate: true })
  onInitValueChange(newValue: Date | null) {
    this.innerValue = newValue
  }

  render() {
    const { label, prop, ...rest } = this.$attrs
    return (
      <rv-form-item label={label} prop={prop}>
        <rv-date-picker
          clearable
          style="width: 250px"
          vModel={this.innerValue}
          type={this.dateType}
          {...{
            attrs: rest,
            on: {
              change: (value: Date) => {
                this.$emit('update:value', value)
                this.$emit('change', value)
              },
              ...this.$listeners
            }
          }}
        ></rv-date-picker>
      </rv-form-item>
    )
  }
}
</script>
