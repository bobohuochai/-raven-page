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

  inneelalue: Date | null = null

  @Watch('initValue', { immediate: true })
  onInitValueChange(newValue: Date | null) {
    this.inneelalue = newValue
  }

  render() {
    const { label, prop, ...rest } = this.$attrs
    return (
      <el-form-item label={label} prop={prop}>
        <el-date-picker
          clearable
          style="width: 250px"
          vModel={this.inneelalue}
          type={this.dateType}
          {...{
            attrs: rest,
            on: {
              ...this.$listeners,
              change: (value: Date) => {
                this.$emit('update:value', value)
                this.$emit('change', value)
              }
            }
          }}
        ></el-date-picker>
      </el-form-item>
    )
  }
}
</script>
