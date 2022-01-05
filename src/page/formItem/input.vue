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
    return (
      <rv-form-item label={label} prop={prop}>
        <rv-input
          clearable
          style="width: 250px"
          value={this.innerValue}
          {...{
            props: rest,
            on: {
              input: (value: string) => {
                this.$emit('input', value)
              },
              ...this.$listeners
            }
          }}
        ></rv-input>
      </rv-form-item>
    )
  }
}
</script>
