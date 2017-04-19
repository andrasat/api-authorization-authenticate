<template>
  <div class="register">
    <div class="box register-container">
      <div class="field">
        <p class="subtitle is-4 has-text-centered">{{ msg }}</p>
        <label class="label">Email</label>
        <p class="control">
          <input :class="inputClass" @keyup="validateEmail()" type="text" v-model="email" placeholder="Email input">
        </p>
        <p v-if="invalidMail" class="help is-danger">This email is invalid</p>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <p class="control">
          <input class="input" type="password" v-model="password" placeholder="Input Password">
        </p>
      </div>
      <div class="field is-grouped">
        <p class="control button is-primary" @click="register()">Submit</p>
        <router-link to="/" class="control button outlined">Back to Login Page</router-link>
      </div>
    </div>
    <div class="box register-container">
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
  name: 'register',
  data () {
    return {
      msg: 'Register Here',
      email: '',
      password: '',
      invalidMail : false
    }
  },
  computed: {
    ...mapGetters([
      'getSuccess',
      'getError'
    ]),
    inputClass() {
      return {
        'input': true,
        'is-danger': false
      }
    }
  },
  methods: {
    ...mapActions([
      'setSuccess',
      'setError'
    ]),
    register() {
      let self = this
      axios.post('http://localhost:3000/api/register', {
        email: self.email,
        password: self.password
      })
        .then((res)=> {
          self.setSuccess(true)
          setTimeout(()=> {self.setSuccess(false)}, 3500)
        })
        .catch((err)=> {
          self.setError(true)
          setTimeout(()=> {self.setError(false)}, 3500)
        })
    },
    validateEmail() {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(regex.test(this.email) || this.email == '') {
        console.log('right')
        this.inputClass['is-danger'] = false
        this.invalidMail = false
      } else {
        console.log('wrong')
        this.inputClass['is-danger'] = true
        this.invalidMail = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-container {
  width: 50%;
  margin: auto;
}
.notification {
  width: 50%;
  margin: auto;
}
</style>