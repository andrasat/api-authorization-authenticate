<template>
  <div class="list">
    <h1 class="title is-2 has-text-centered">{{ msg }}</h1>
    <table class="table">
      <thead>
        <th>Users</th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr v-for="">
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      msg: 'User List'
    }
  }
}
</script>

<style scoped>

</style>