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
      return
    }
    const { label, prop, ...rest } = this.$attrs
    return (
      <el-form-item label={label} prop={prop}>
        <el-select
          clearable
          style="width: 250px"
          value={this.innerValue}
          {...{
            attrs: rest,
            on: {
              ...this.$listeners,
              change: (value: string) => {
                this.$emit('change', value)
              }
            }
          }}
        >
          {options.map((option: { value: string; label: string }) => (
            <el-option
              key={option.value}
              value={option.value}
              label={option.label}
            ></el-option>
          ))}
        </el-select>
      </el-form-item>
    )
  }
}
</script>
