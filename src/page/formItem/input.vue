<script lang="tsx">
import { Component, Vue, Model } from 'vue-property-decorator'

@Component({
  name: 'form-item-input'
})
export default class FormItemInput extends Vue {
  @Model('input', { type: String })
  innerValue: string

  render() {
    const { label, prop, ...rest } = this.$attrs
    let { labelWidth } = this.$attrs
    return (
      <el-form-item label={label} prop={prop} labelWidth={labelWidth}>
        <el-input
          clearable
          style="width: 250px"
          value={this.innerValue}
          {...{
            attrs: rest,
            on: {
              input: (value: string) => {
                this.$emit('input', value)
              },
              ...this.$listeners
            }
          }}
        ></el-input>
      </el-form-item>
    )
  }
}
</script>
