<script lang="tsx">
import { Component, Vue, Model } from 'vue-property-decorator'
import { AmountInput } from 'fe-amount-input'

@Component({
  name: 'form-item-amount-input'
})
export default class FormItemAmountInput extends Vue {
  @Model('amount-input', { type: Number })
  innerValue: number

  render() {
    const { label, prop, ...rest } = this.$attrs
    return (
      <el-form-item label={label} prop={prop}>
        <AmountInput
          clearable
          class="amount"
          value={this.innerValue}
          {...{
            attrs: rest,
            on: {
              change: (value: { amount: number }) => {
                this.$emit('update:value', value.amount)
                this.$emit('change', value.amount)
              },
              ...this.$listeners
            }
          }}
        />
      </el-form-item>
    )
  }
}
</script>
<style scoped>
.amount {
  width: 250px;
  box-sizing: border-box;
}
::v-deep .input-wrapper:focus-within {
  border-color: #409eff;
}
</style>
