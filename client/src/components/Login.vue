<template>
  <div class="login">
    <div class="box login-container">
      <div class="field">
        <p class="subtitle is-4 has-text-centered">{{ msg }}</p>
        <label class="label">Email</label>
        <p class="control">
          <input class="input" type="text" v-model="email" placeholder="Email input">
        </p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <p class="control">
          <input class="input" type="password" v-model="password" placeholder="Input Password">
        </p>
      </div>
      <div class="field is-grouped">
        <p class="control button is-primary">Submit</p>
        <router-link to="/register" class="control button outlined">or Register</router-link>
      </div>
    </div>
    <div class="box login-container">
      <div v-if="getSuccess" class="notification is-success has-text-centered">
        <button class="delete"></button>
        Success
      </div>
      <div v-if="getError" class="notification is-danger has-text-centered">
        <button class="delete"></button>
        Failed
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Login Here',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters([
      'getSuccess',
      'getError'
    ])
  },
  methods: {
    ...mapActions([
      'setSuccess',
      'setError'
    ]),
    login() {
      let self = this
      axios.post('http://localhost:3000/api/login', {
        email: self.email,
        password: self.password
      })
        .then((res)=> {
          self.setSuccess(true)
          setTimeout(()=> {
            self.setSuccess(false)
            self.$route.push('/list')
          }, 2500)
        })
        .catch((err)=> {
          self.setError(true)
          setTimeout(()=> {
            self.setError(false)
            window.location.reload()
          }, 3500)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  width: 50%;
  margin: auto;
}
.notification {
  width: 50%;
  margin: auto;
}
</style>
