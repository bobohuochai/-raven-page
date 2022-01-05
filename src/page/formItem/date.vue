<script lang="tsx">
import { Component, Vue, Model } from 'vue-property-decorator'

@Component({
  name: 'form-item-input'
})
export default class FormItemInput extends Vue {
  @Model('change', { type: Date })
  innerValue: Date

  render() {
    const { label, prop, ...rest } = this.$attrs
    return (
      <rv-form-item label={label} prop={prop}>
        <rv-date-picker
          clearable
          style="width: 250px"
          value={this.innerValue}
          {...{
            props: rest,
            on: {
              change: (value: Date) => {
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
