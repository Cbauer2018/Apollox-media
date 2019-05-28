<template>
<v-layout justify-center mt-5>
    <v-flex xs6>
        <v-card>
            <v-flex>
            <v-layout justify-center>
                <h2 class = "display-1 font-weight-thin">Edit Profile</h2>
            </v-layout>
            </v-flex>
            <v-layout justify-center>
            <v-avatar
          :tile= "tile"
          :size="100"
          color="grey lighten-4"
        >
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>
        </v-layout>
            <v-flex my-3
                v-for="profile in profile" 
                :key="profile">
                <h2 class = "font-weight-thin">Username</h2>
                    <v-text-field background-color="cyan lighten-2" outline :value = 'profile.username'></v-text-field>
            </v-flex>
            <v-flex my-3
               v-for="profile in profile" 
                :key="profile">
                <h2 class = "font-weight-thin">Bio</h2>
                     <v-text-field background-color="cyan lighten-2" outline :value = 'profile.bio'></v-text-field>
             </v-flex>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
export default {

computed: {
    profile(){
        return this.$store.getters.loadedProfile;
      }
},
}
</script>