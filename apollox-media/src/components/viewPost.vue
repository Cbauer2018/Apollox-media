<template>
    <container>
        <v-layout row>
            <v-flex xs2>
                <v-card>
                    <v-flex ma-4>
                        <v-layout column>
                            <v-avatar
                                :size="75"
                                color="grey lighten-4">
                               <img v-if="hasProfilePic" :src="imageUrl" alt="avatar">
                            <img v-else :src="imageUrl" alt="avatar" >
                            </v-avatar>
                            <v-flex v-for="profile in profile" :key="profile">
                                <span>{{profile.username}}</span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-card>
            </v-flex>
            <v-flex xs8>
            <v-layout column>
                <v-flex my-4>
                    <v-card v-for="post in post" :key="post">
                        <h3 class="display-2 font-weight-thin">{{post.title}}</h3>
                        <h2 class="font-weight-thin">{{post.newReview}}</h2>
                    </v-card>
                </v-flex>
            </v-layout>
            </v-flex>
        </v-layout>
    </container>
</template>


<script>
export default{
    data () {
      return {
        

        imageUrl: require('@/assets/RocketLogo.png')
      }
    },

    beforeCreate() {
        this.$store.dispatch('loadProfile', {uid: this.$route.params.uid})
        this.$store.dispatch('loadPost', {postKey: this.$route.params.post, uid: this.$route.params.uid})
    },

    computed: {
        profile(){
            return this.$store.getters.loadedProfile;
      },

        post(){
            return this.$store.getters.loadedPost;
        },
         hasProfilePic(){
             let profile = this.profile
            if(profile[0].imageUrl != null){
           this.imageUrl = profile[0].imageUrl
           
           return true
         }else{
             this.imageUrl = require('@/assets/RocketLogo.png')
           return false
         }
       },
    }
}
</script>