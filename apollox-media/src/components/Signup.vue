<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert  @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-layout justify-center my-1>
              <h2 class = "display-1 font-weight-thin">Sign Up</h2>
            </v-layout>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="username"
                      label="Username"
                      @change="checkUsername"
                      id="username"
                      v-model="username"
                      type="username"
                      maxlength="25"
                      counter
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
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                  
                </v-layout>
                <span>By clicking Sign Up, you agree to our <a href="https://app.termly.io/document/privacy-policy/acab2786-f537-4216-bf94-e1d215ff4c16">Privacy Policy</a> and <a href="https://app.termly.io/document/terms-of-use-for-website/296b1ad3-677c-4c63-8456-9c029b274b0c">Terms of Use</a></span>
                <v-layout justify-end xs12>
                    <v-btn  outline color="cyan lighten-1" type="submit" :disabled="loading" :loading="loading">
                      Sign up
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
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
      }
    },
    computed: {
      clearError(){
       this.$store.dispatch('clearError')
      },
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
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
      onSignup () {
        var alphaExp=/^[0-9a-zA-Z]+$/;
      if(!(this.username.match(alphaExp)))
          {
          alert("Username must contain only numbers and letters");
          
            }else{
              
              
                 
                  if(this.$store.getters.isUsernameValid){
              
            this.$store.dispatch('signUserUp', {email: this.email, username: this.username, password: this.password})
             }else{
               alert("This username is already taken")
           
          
          
          }

            
              }
            
            
      },
      
        checkUsername(){

          this.$store.dispatch('checkUsername', {username: this.username})
        },

      // this.$store.dispatch('signUserUp', {email: this.email, username: this.username, password: this.password})
      onDismissed () {
        this.$store.dispatch('clearError')
      },


     
      
      
      

      
    }
  }
</script>