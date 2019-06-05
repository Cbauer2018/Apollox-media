<template>
    <v-container>
    <v-flex xs9>
                    <v-card>
                    <v-flex
                          v-for="post in recentPosts" 
                          :key="post">
                          <h4 class = "font-weight-thin"
                          @click="goToProfile(post.uid)">
                          {{ post.username}} </h4>
                    <v-flex my-2>
                      <h2 class = "font-weight-thin">{{post.title}}</h2>
                      <v-flex my-2>
                      <span>
                          {{post.newReview}}
                      </span>
                      </v-flex>
                    </v-flex>
                    <v-layout column wrap>
                      <v-flex xs1>
                      </v-flex>
                      <v-flex xs9>
                           <v-list>
          <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile color="green">
                <v-list-tile-content >
                  <v-list-tile-title >What is Correct</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile >
              <v-list-tile-content
              v-for="text in post.rightList"
              :key="text.text"
             
              >
                <v-list-tile-title>{{text.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>


           <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile  color="red">
                <v-list-tile-content>
                  <v-list-tile-title>What is Incorrect</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
            >
              <v-list-tile-content
              v-for="text in post.wrongList"
              :key="text.text">
                <v-list-tile-title>{{text.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

  <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile color="yellow darken-3">
                <v-list-tile-content>
                  <v-list-tile-title>Important Facts that were not included</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
            >
              <v-list-tile-content
              v-for="text in post.notIncludedList"
              :key="text.text">
                <v-list-tile-title>{{text.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          
        </v-list>
                      </v-flex>
                    </v-layout>
                    </v-flex>
                    </v-card>
                    </v-flex>

    </v-container>
</template>

<script>


export default {
  data () {
      return {
        
      }
    },
methods: {
    goToProfile(profileUid){
      console.log(profileUid)
          this.$store.dispatch('loadProfile', {uid: profileUid})
          this.$store.dispatch('loadProfilePosts', {uid: profileUid})
          this.$router.push('/Profile/'+ profileUid)
          console.log("Router", this.$route.params.uid)

    }
},

computed: {
    recentPosts(){
      
        return this.$store.getters.loadedRecentPosts;
      
      },
      
    
},

}

</script>