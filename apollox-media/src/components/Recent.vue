<template>
    <v-container>
   


   
        <v-layout row wrap>
              <v-flex xs2>
                <v-card></v-card>
              </v-flex>
                    <v-flex xs8>
                      <v-card
                          v-for="post in recentPosts" 
                          :key="post">
                          <v-flex>
                            <v-card flat>
                          <v-layout row>
                            <v-flex ma-2 xs1 mr-2>
                              <v-layout column>
                        <v-avatar
                            :size="75"
                            color="grey lighten-4">
                            
                            <img v-if="hasProfilePic(post)" :src="imageUrl" alt="avatar">
                            <img v-else :src="imageUrl" alt="avatar" >
                        </v-avatar>
                        <v-flex my-3>
                        <h4 class = "font-weight-thin" @click="goToProfile(post.uid)">
                          {{post.username}}
                           </h4>
                          </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-layout column>
                          <v-flex my-2 ml-5>
                          <h1 @click="viewPost(post)" class = "font-weight-thin">{{post.title}}</h1>
                            <span v-show="post.newReviewSlice != 'null'">
                                {{post.newReviewSlice}}
                            </span>
                            <span v-show="post.newReviewSlice == 'null'">{{post.yourReview}}</span>                            
                            <v-flex>
                             <v-flex xs12>
                           <v-list>
          <v-list-group
            no-action>
            <template v-slot:activator>
              <v-list-tile color="green">
                <v-list-tile-content>
                  <v-list-tile-title >What is Correct</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile 
            v-for="text in post.rightList"
              :key="text.text">
              <v-list-tile-content >
                <v-list-tile-title>{{text.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>


           <v-list-group
            no-action
          >
            <template active v-slot:activator>
              <v-list-tile  color="red">
                <v-list-tile-content>
                  <v-list-tile-title>What is Incorrect</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
            v-for="text in post.wrongList"
              :key="text.text">
              <v-list-tile-content
              
                  >
                <v-list-tile-title>{{text.text}} </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

  <v-list-group
           
          >
            <template active v-slot:activator>
              <v-list-tile color="yellow darken-3">
                <v-list-tile-content>
                  <v-list-tile-title>Important Facts that were not included</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
            v-for="text in post.notIncludedList"
              :key="text.text">
              <v-list-tile-content>
                <v-list-tile-title>{{text.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          
        </v-list>
                      </v-flex>

                            <v-layout row wrap>
                              <v-flex sm10 md4 my-3>
                                <v-rating
                                
                                hover
                                :value="post.rating"
                                color = "cyan lighten-1"
                                background-color="cyan lighten-1"
                                readonly
                                half-increments></v-rating>
                              </v-flex>
                              <v-flex md2 my-4>
                                  {{post.voters}}
                              </v-flex>
                              <v-flex xs8 md4>
                                <V-text-field
                                maxlength = "300"
                                v-model="comment"
                               
                                placeholder="Comment..."></V-text-field>
                                </v-flex>
                                <v-flex xs2>
                                  <v-btn
                                  flat
                                  fab
                                  color="cyan lighten-1"
                                  @click="postComment(post)">
                                    <v-icon>forward</v-icon>
                                  </v-btn>
                                </v-flex>


                               
                            </v-layout>
                            </v-flex>
                            </v-flex>
                          </v-layout>
                          
                          <v-card flat>
                          <v-flex my-2 mr-2>
                            <h2 class="font-weight-thin">{{post.date}}</h2>
                          </v-flex>
                          </v-card>
                          
                        </v-layout>
                        </v-card>
                        </v-flex>
                      </v-card>
                      
                    </v-flex>
                    <v-flex xs2>
                        <v-card></v-card>
                      </v-flex>
          </v-layout>
                   
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
        imageUrl:require('@/assets/RocketLogo.png'),
        postCount: 1
      }
    },
    beforeCreate() {
      this.$store.dispatch('loadRecentPosts',{index:2})
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
        console.log('length',this.$store.getters.loadedRecentPosts.length )
        console.log('post Count length', this.postCount)
        if(this.$store.getters.loadedRecentPosts.length != this.postCount){
          setTimeout(() => {
           
        $state.loaded()
        
        
      }, 1000);
        }else{
            
          $state.complete()
        }
        this.postCount = this.$store.getters.loadedRecentPosts.length 
    },
     hasProfilePic(post){
       
       let thisPost = post
     
      
         if(thisPost.imageUrl != null){
          this.imageUrl = post.imageUrl
          return true
         }else{

         
          return false
         }
       }

   
},

computed: {
    recentPosts(){
     
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
