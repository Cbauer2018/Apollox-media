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
              <h2 class = "display-1 font-weight-thin">Reset Password</h2>
            </v-layout>
            <v-container>
              <form @submit.prevent="resetPassword">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Enter your email"
                      id="email"
                      v-model="loginName"
                      type="text"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout xs12 justify-end row>
                 
                    <v-btn v-show="resetButton" outline color="cyan lighten-1" type="submit" :disabled="loading" :loading="loading">
                      Reset Password
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                    <span v-show="!resetButton">Email Sent!</span>
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
        resetButton: true
       
      }
    },
     
    methods: {
     
      resetPassword(){
        this.$store.dispatch('resetPassword', {email: this.loginName})
        this.resetButton = false
      }

     
    }
  }
</script>