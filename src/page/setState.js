export default {
  methods: {
    setState(state = {}, callback) {
      let newState =
        typeof state === 'function' ? state(this.$data, this.$props) : state
      Object.assign(this.$data, newState)
      this.$forceUpdate()
      this.$nextTick(() => {
        callback && callback()
      })
    }
  }
}
