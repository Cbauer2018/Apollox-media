<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-layout justify-center my-1>
              <h2 class = "display-1 font-weight-thin">Login</h2>
            </v-layout>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email or Username"
                      id="email"
                      v-model="loginName"
                      type="text"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                       <span class="myClickableThingy"
                        @click="resetPassword"><u>Forgot Password?</u></span>
                  </v-flex>  
                </v-layout>
                <v-layout xs12 justify-end row>
                 
                    <v-btn outline color="cyan lighten-1" type="submit" :disabled="loading" :loading="loading">
                       Login
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        loginName: '',
        password: ''
      }
    },
    computed: {
      clearError(){
        return this.$store.dispatch('clearError')
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {loginName: this.loginName, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      resetPassword(){
        this.$router.push('/resetpassword')
      }

     
    }
  }
</script>