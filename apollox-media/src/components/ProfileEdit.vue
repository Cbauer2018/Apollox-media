<template>
<v-layout justify-center mt-5>
    <v-flex xs12 sm6>
        <v-card>
          <v-card-text>
            <v-container>
              <form>
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
                            :tile= "tile"
                            :size="120"
                            color="grey lighten-4">
                            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
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
                                @change = "onFilePicked">
                        <v-flex my-3
                                v-for="profile in profile" 
                                :key = "profile">
                                <span class = "font-weight-thin">Username</span>
                        <v-text-field 
                                v-model = "username"  
                                :value = "profile.username"
                                counter = 25
                                maxlength = 25>
                        </v-text-field>
                        </v-flex>
                    <v-flex my-3>
                            <span class = "font-weight-thin">Bio</span>
                        <v-textarea 
                            v-for="profile in profile" 
                            :key = "profile"
                            v-model = "bio"  
                            :value = "profile.bio"
                            counter = 300
                            maxlength = 300
                            outline
                            single-line>
                        </v-textarea>
                    </v-flex>
                    <v-layout justify-center>
                <v-btn outline round color="cyan lighten-2" @click = "changeProfile">
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
        imageURl: '',
        image: null,
    }
},
computed: {
    profile(){
        return this.$store.getters.loadedProfile
      }
},
methods: {
    changeProfile() {
        this.$store.dispatch('changeProfile', {username: this.username, bio: this.bio, fileName: this.image.name, blob: this.blob})
    },
    onPickFile() {
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
            this.imageURL = fileReader.result()
             var blob = new Blob([fileReader.result()], {type:"image/*"})
             console.log(blob)
        })
        
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
        console.log(this.image)
    },

}
}
</script>