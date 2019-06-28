<template>
    <v-container>
        <v-layout justify-center column > 
          
               <v-layout justify-center>
  <v-flex xs5  my-3 >
        <v-card flat>
          <v-card-text>
            <v-container>
           
             <v-layout justify-center><h1>Users:</h1></v-layout>
             <v-layout justify-center column >
             
                  <v-flex 
                v-for="username in searchedUsernames" 
                :key="username">
               
                   <v-card wrap>
                       <v-layout row wrap>
               <v-avatar
              
                :tile="tile"
                :size="140"
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
                    </v-card>
          </v-flex>
             </v-layout>
               
            </v-container>
          </v-card-text>
        </v-card>
        
  </v-flex>
  </v-layout>
        
        
  </v-layout>




   
           
             <v-layout justify-center><h1>Posts:</h1></v-layout>
              
          <v-layout row wrap>
              <v-flex>
                <v-card></v-card>
              </v-flex>
              
                    <v-flex xs12 >
                      <v-card
                          v-for="post in searchedPosts" 
                          :key="post">
                          <v-flex>
                            <v-card flat>
                          <v-layout row>
                            <v-flex ma-2 xs1 mr-2>
                              <v-layout column>
                        <v-avatar
                            :size="75"
                            color="grey lighten-4">
                            
                            <img v-if="post.imageUrl != null" @click="goToProfile(post.uid)"  class = "myClickableThingy" :src="post.imageUrl" alt="avatar">
                            <img v-else @click="goToProfile(post.uid)" class = "myClickableThingy"  :src="imageUrl" alt="avatar" >
                        </v-avatar>
                        <v-flex my-3>
                        <h4 class = "font-weight-thin myClickableThingy" @click="goToProfile(post.uid)">
                          {{post.username}}
                           </h4>
                          </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-layout column>
                          <v-flex my-2 ml-5>
                          <h1 @click="viewPost(post)" class = "font-weight-thin myClickableThingy">{{post.title}}</h1>
                            <span v-show="post.newReviewSlice != 'null'">
                                {{post.newReviewSlice}}
                            </span>
                          
                    
                            
                         <span   v-show="post.newReviewSlice == 'null'" class=" font-weight-thin myClickableThingy htmltext " @click="goToReview(post.yourReview)" >{{post.yourReview}}</span>
                             
                          
                                                     
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
              :key="text.text"
              v-if="text.text != '' ">
              <v-list-tile-content >
                <v-list-tile-title>* {{text.text}}</v-list-tile-title>
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
              :key="text.text"
              v-if="text.text != '' ">
              <v-list-tile-content
              
                  >
                <v-list-tile-title>* {{text.text}} </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

  <v-list-group
           no-action
          >
            <template active v-slot:activator>
              <v-list-tile color="yellow darken-3">
                <v-list-tile-content>
                    <div v-responsive.lg.xl >
                  <v-list-tile-title>Important Facts that were not included</v-list-tile-title>
                  </div>
                  <div v-responsive ="['hidden-all','xs','sm', 'md']" >
                     <v-list-tile-title>Facts Missing</v-list-tile-title>
                  </div>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
            v-for="text in post.notIncludedList"
              :key="text.text"
              v-if="text.text != '' ">
              <v-list-tile-content>
                <v-list-tile-title>* {{text.text}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          
              </v-list>
                      </v-flex>

                            <v-layout row wrap>
                              <v-flex sm10 md6 my-3>
                                <v-layout row>
                                <v-rating 
                                  hover
                                  :value="post.rating"
                                  color = "cyan lighten-1"
                                  background-color="cyan lighten-1"
                                  readonly
                                  half-increments></v-rating>
                              
                              <v-flex my-3 ml-2>
                                  {{post.voters}}
                              </v-flex>
                              </v-layout>
                              </v-flex>
                 
                            </v-layout>
                            </v-flex>
                            </v-flex>
                          </v-layout>
                          <div v-responsive.lg.xl >
                          <v-card flat>
                          <v-flex my-2 mr-2>
                            <h2 class="font-weight-thin">{{post.date}}</h2>
                          </v-flex>
                          </v-card>
                          </div>
                          
                        </v-layout>
                        </v-card>
                        </v-flex>
                         
                      </v-card>
                     
                    </v-flex>
                     
                  
          </v-layout>
                          
                       
                      
                     
        
      
  
    </v-container>
</template>

<script>


export default {
  data () {
      return {
        imageUrl:require('@/assets/RocketLogo.png'),
        profileImageUrl:require('@/assets/RocketLogo.png')
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
   viewPost(post) {
        var profileUid = post.uid
        
        this.$store.dispatch('loadPost', {uid: profileUid, postKey: post.key})
        this.$router.push("/viewPost/" + profileUid+ '/' + post.key)
    },
},
beforeCreate() {
    this.$store.dispatch('searchWord', {keyword: this.$route.params.keyword})
},

computed: {
    searchedPosts(){
      
        return this.$store.getters.loadedSearchedPosts;
      
      },
      searchedUsernames(){
          return this.$store.getters.loadedSearchedUsernames;
      }
      
    
},

}


</script>


