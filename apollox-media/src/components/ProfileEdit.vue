<template>
<v-layout justify-center mt-5>
    <v-flex xs12 sm6>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="changeProfile">
                   <v-layout>
                            <v-btn
                            router
                            :to="'/Profile'"
                            small 
                            flat
                            fab
                            color="cyan lighten-1">
                                <v-icon>
                                    keyboard_arrow_left
                                </v-icon>
                            </v-btn>
                        </v-layout>
                    <v-layout justify-center>
                       
                        <h1 class = "display-2 font-weight-thin">Edit Profile</h1>
                    </v-layout>
                    <v-layout my-2 justify-center>
                        <v-avatar
                            v-for="profile in profile"
                            :key="profile"
                            :tile= "tile"
                            :size="120"
                            color="grey lighten-4">
                            <img v-if="hasProfilePic" :src="imageUrl" alt="avatar">
                            <img v-else :src="imageUrl" alt="avatar" >
                           
                        </v-avatar>
                    </v-layout>
                    <v-layout my-2 justify-center>
                        <v-btn outline round color="cyan lighten-2" @click = "onPickFile">
                                Upload Picture
                        </v-btn>
                        </v-layout>
                            <input 
                                type  = "file" 
                                style = "display: none" 
                                ref = "fileInput" 
                                accept = "image/*"
                                @change = "onFilePicked"
                                >
                        <v-flex my-3
                        v-for="profile in profile" 
                                :key = "profile"
                                >
                                <span class = "font-weight-thin">Username</span>
                        <v-text-field 
                            :value="profile.username"
                             @change="checkUsername"
                            v-model="username"
                             maxlength="25"
                            counter
                            required> 
                            {{profile.username}}
                        </v-text-field>
                        
                        </v-flex>
                    <v-flex my-3 
                     v-for="profile in profile" 
                    :key = "profile"
                        >
                       <span class = "font-weight-thin">Bio</span>
                        <v-textarea 
                            v-model = "bio"  
                            :value="profile"
                            counter = 300
                            maxlength = 300
                            outline
                            single-line>
                             
                        </v-textarea>
                    </v-flex>
                    <v-layout justify-center>
                <v-btn outline round type="submit" color="cyan lighten-2" >
                 Submit
             </v-btn>
             </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
    </v-flex>
</v-layout>
</template>

<script>
export default {

data() {
    return {
        imageUrl:require('@/assets/astronautlogo.jpg'),
        image: null,
        bio: '',
        username: ''
      
        
    }
},
computed: {
    profile(){
        return this.$store.getters.loadedProfile
      },

       hasProfilePic(){
       
       let profile = this.profile
       this.bio = profile[0].bio
       this.username = profile[0].username
         if(profile[0].imageUrl != null){
          this.imageUrl = profile[0].imageUrl
          return true
         }else{

         
          return false
         }
       }
      
      
},
methods: {
    changeProfile() {
        

         var alphaExp=/^[0-9a-zA-Z]+$/;
      if(!(this.username.match(alphaExp)))
          {
          alert("Username must contain only numbers and letters");
          
            }else{
                let profile = this.profile
                console.log("username", profile[0].username)
              if(this.username != profile[0].username){
                  if(this.$store.getters.isUsernameValid){
                      this.$store.dispatch('changeProfile', {username: this.username, bio: this.bio, fileName: this.image}).then(data =>{
             this.$store.dispatch('loadProfile')
         this.$router.push('/Profile')
                      })
                
             }else{
               alert("This username is already taken")
           
          }

            
              }else{
                  this.$store.dispatch('changeProfile', {username: this.username, bio: this.bio, fileName: this.image}).then(data =>{
             this.$store.dispatch('loadProfile')
         this.$router.push('/Profile')
                      })
              }
            }
              
        
    },
     onPickFile () {
        this.$refs.fileInput.click()
        
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
          console.log(this.imageUrl)
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
        
        
      },
      checkUsername(){

          this.$store.dispatch('checkUsername', {username: this.username})
        },
        
       

    }
}
</script>