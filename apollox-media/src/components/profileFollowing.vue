<template>
    <v-container>
        <v-layout justify-center column > 
          
               <v-layout justify-center>
  <v-flex xs5  my-3 >
      <v-btn
           
                router
                :to="'/Profile/' + profileUid"
                large 
                 flat
                fab
            color="black">
            <v-icon>
                keyboard_arrow_left
                </v-icon>
       </v-btn>
        <v-card flat>
          <v-card-text>
            <v-container>
           
             <v-layout justify-center><h1>Following:</h1></v-layout>
             <v-layout justify-center column >
             
                  <v-flex justify-center
                v-for="username in followerUsernames" 
                :key="username">
               
                  
                       <v-layout row my-1 >
               <v-avatar
              
                :tile="tile"
                :size="100"
                color="grey lighten-4">
                <img class = "myClickableThingy"  @click="goToProfile(username.uid)"
                v-if="hasProfilePic(username.imageUrl)" 
                :src="username.imageUrl" alt="avatar">
                <img v-else src="@/assets/RocketLogo.png">
              </v-avatar>
              <v-layout align-center>
                  <h2  class = "display-1 font-weight-thin myClickableThingy"  @click="goToProfile(username.uid)">
                    {{  username.username }} </h2>

                    </v-layout>
                    
                    </v-layout>
                   
          </v-flex>
             </v-layout>
               
            </v-container>
          </v-card-text>
        </v-card>
        
  </v-flex>
  </v-layout>
        
        
  </v-layout>

  
    </v-container>
</template>

<script>


export default {
  data () {
      return {
        imageUrl:require('@/assets/RocketLogo.png'),
        profileImageUrl:require('@/assets/RocketLogo.png'),
        profileUid: this.$route.params.uid
      }
    },
methods: {
    goToProfile(profileUid){
     
          this.$store.dispatch('loadProfile', {uid: profileUid})
          this.$store.dispatch('loadProfilePosts', {uid: profileUid, index: 2})
          this.$router.push('/Profile/'+ profileUid)
         

    },
      postHasProfilePic(post){
       
       let thisPost = post
     
      
         if(thisPost.imageUrl != null){
          this.imageUrl = post.imageUrl
          return true
         }else{

         this.imageUrl = require('@/assets/RocketLogo.png')
          return false
         }
       },
       hasProfilePic(imageUrl){
       
      
     
      
         if(imageUrl != null){
          this.profileImageUrl = imageUrl
          return true
         }else{

         this.profileImageUrl= require('@/assets/RocketLogo.png')
          return false
         }
       },
  
},
beforeCreate() {
    this.$store.dispatch('viewFollowing', {uid:this.$route.params.uid})
},

computed: {
   
      followerUsernames(){
          return this.$store.getters.loadedProfileFollowing;
      }
      
    
},

}


</script>