export default {
    methods: {
      setState(state = {}, callback) {
        let newState =
          typeof state === 'function' ? state(this.$data, this.$props) : state
        console.log('$data===>', this.$data, newState)
        Object.assign(this.$data, newState)
        console.log('$data end===>', this.$data, newState)
        this.$forceUpdate()
        this.$nextTick(() => {
          callback && callback()
        })
      }
    }
  }
  