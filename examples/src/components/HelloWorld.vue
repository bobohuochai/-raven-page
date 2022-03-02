<template>
  <div class="hello">
    <av-page :tableConfig="tableConfig">
      <template v-slot:header>Hello alpha-page</template>
    </av-page>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      tableConfig: {
        columns: [
          {
            prop: 'name',
            label: 'name'
          },
          {
            prop: 'id',
            label: 'ID'
          }
        ],
        data: [
          {
            id: 1,
            name: 'name1'
          },
          {
            id: 2,
            name: 'name2'
          }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
