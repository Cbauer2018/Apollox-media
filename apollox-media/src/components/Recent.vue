<template>
    <v-container>
   


    <v-flex xs9>
                    <v-card>
                    <v-flex
                          v-for="post in recentPosts" 
                          :key="post">
                          <h4 type="text-link" class = "font-weight-thin myClickableThingy"

                          @click="goToProfile(post.uid)">
                          {{ post.username}} </h4>
                    <v-flex my-2>
                      <h2 class = "font-weight-thin" @click="testingRecents">{{post.title}}</h2>
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
                   
 <infinite-loading ref="InfiniteLoading" @infinite="infiniteHandler"></infinite-loading>
    </v-container>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
export default {
  components:{
    InfiniteLoading,
  },
  data () {
      return {
        postCount: 0
      }
    },
       
methods: {
  testingRecents(){
    console.log(this.$store.getters.loadedRecentPosts)
  },
    goToProfile(profileUid){
      console.log(profileUid)
          this.$store.dispatch('loadProfile', {uid: profileUid})
          this.$store.dispatch('loadProfilePosts', {uid: profileUid, index: 2})
          this.$router.push('/Profile/'+ profileUid)
          console.log("Router", this.$route.params.uid)

    },
    
    infiniteHandler($state){
        
        this.$store.dispatch('loadRecentPosts', {index: this.recentPosts.length + 2})
          
        if(this.$store.getters.loadedRecentPosts.length == this.postCount){
          setTimeout(() => {
           
        $state.loaded()
        
        console.log(this.$store.getters.loadedRecentPosts.length + "vs" + this.postCount)
      }, 1500);
        }else{
            console.log(this.$store.getters.loadedRecentPosts.length + "vs complete" + this.postCount)
          $state.complete()
        }
        this.postCount = this.$store.getters.loadedRecentPosts.length + 2
    },

   
},

computed: {
    recentPosts(){
       this.postCount = 2
        return this.$store.getters.loadedRecentPosts;
      
      },
      
    
},

}
</script>

<style>
.myClickableThingy {
    cursor: pointer;
}
</style>
