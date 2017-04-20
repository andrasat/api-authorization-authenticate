<template>
  <div class="list">
    <h1 class="title is-2 has-text-centered">{{ msg }}</h1>
    <p v-if="getLoggedUser" class="logout-button button is-outlined has-text-centered" @click="logout()">Logout</p>
    <table class="table table-list">
      <thead>
        <th>Users</th>
        <th>Admin status</th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin }}</td>
          <td>
            <div v-if="getIsUserAdmin == true" class="field is-grouped">
              <a v-if="getIsUserAdmin == true" class="button is-warning" @click="selectUser(user), setModalActive()"><span class="icon is-small"><i class="fa fa-pencil"></i></span><span>Edit</span></a>
              <a v-if="getIsUserAdmin == true" class="button is-danger" @click="deleteUser(user)"><span class="icon is-small"><i class="fa fa-times"></i></span><span>Delete</span></a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="getSuccess" class="notification is-success has-text-centered">
      <button class="delete"></button>
      Success
    </div>
    <div v-if="getError" class="notification is-danger has-text-centered">
      <button class="delete"></button>
      Failed
    </div>
    <div :class="getModalClass">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="media-content">
            <div class="field">
              <label class="label">Email</label>
              <p class="control">
                <input class="input" type="text" v-model="selectedUser.email" placeholder="Email input">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="selectedUser.isAdmin"> isAdmin
                </label>
              </p>
            </div>
            <div class="field is-grouped">
              <a class="button is-primary" @click="editUser()">Submit</a>
              <a class="button is-white cancel-button" @click="setModalInactive()">Cancel</a>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close" @click="setModalInactive()"></button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'list',
  data () {
    return {
      msg: 'User List',
      users: [],
      selectedUser: {}
    }
  },
  computed: {
    ...mapGetters([
      'getIsUserAdmin',
      'getLoggedUser',
      'getModalClass',
      'getSuccess',
      'getError'
    ])
  },
  methods: {
    ...mapActions([
      'setModalActive',
      'setModalInactive',
      'setSuccess',
      'setError'
    ]),
    getUsers() {
      let self = this
      axios.get('http://localhost:3000/api/user')
        .then((res)=> {
          self.users = res.data
        })
        .catch((err)=> {
          console.log(err)
          alert('Server error')
        })
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('isAdmin')
      window.location.reload()
      this.$router.push('/')
    },
    selectUser(data) {
      this.selectedUser = data
    },
    editUser() {
      let self = this
      axios.put('http://localhost:3000/api/user/'+self.selectedUser._id, {
        email: self.selectedUser.email,
        isAdmin: self.selectedUser.isAdmin
      }, {headers: {'token': localStorage.getItem('token')}})
        .then((res)=> {
          self.users.splice(self.users.indexOf(self.selectedUser), 1, self.selectedUser)
          self.setModalInactive()
          self.setSuccess(true)
          setTimeout(()=> {self.setSuccess(false)}, 3500)
        })
        .catch((err)=> {
          self.setError(true)
          setTimeout(()=> {self.setError(false)}, 3500)
        })
    },
    deleteUser(data) {
      let self = this
      axios.delete('http://localhost:3000/api/user/'+data._id, {headers: {'token': localStorage.getItem('token')}})
        .then((res)=> {
          self.users.splice(self.users.indexOf(data), 1)
          self.setSuccess(true)
          setTimeout(()=> {self.setSuccess(false)}, 3500)
        })
        .catch((err)=> {
          console.log(err)
          self.setError(true)
          setTimeout(()=> {self.setError(false)}, 3500)
        })
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style scoped>
.logout-button {
  margin: 1em;
}
.table-list {
  margin: 1em;
}
.cancel-button {
  margin: 0 1em;
}
</style>