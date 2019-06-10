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
                <img 
                v-if="hasProfilePic(username.imageUrl)" 
                :src="username.imageUrl" alt="avatar">
                <img v-else src="@/assets/RocketLogo.png">
              </v-avatar>
              <v-layout align-center>
                  <h2  class = "display-1 font-weight-thin">
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
              <v-flex xs2>
                <v-card></v-card>
              </v-flex>
                    <v-flex xs8>
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
                            <img 
                v-if="hasProfilePic(post.imageUrl)" 
                :src="post.imageUrl" alt="avatar">
                <img v-else src="@/assets/RocketLogo.png">
                        </v-avatar>
                        <v-flex my-3>
                        <h4 class = "font-weight-thin">
                          {{post.username}} </h4>
                          </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-layout column>
                          <v-flex my-2 ml-5>
                          <h1 @click="viewPost(post)" class = "font-weight-thin myClickableThingy">{{post.title}}</h1>
                            <span v-show="post.newReviewSlice != 'null'">
                                {{post.newReviewSlice}}
                            </span>
                            <span  v-show="post.newReviewSlice == 'null'" >{{post.yourReview}}</span>                            
                            <v-flex>
                             <v-flex xs12>
                           <v-list>
          <v-list-group
            no-action
          >
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
                              <v-flex sm12 md6 my-3>
                                <v-rating v-show="!userIdMatch"
                                hover
                                color = "cyan lighten-1"
                                background-color="cyan lighten-1"
                                half-increments></v-rating>
                                <v-rating v-show="userIdMatch"
                                v-model="rating"
                                hover
                                color = "cyan lighten-1"
                                background-color="cyan lighten-1"
                                readonly
                                half-increments></v-rating>
                              </v-flex>
                              <v-flex xs8 md4>
                                <V-text-field
                                maxlength = "300"
                                placeholder="Comment..."></V-text-field>
                                </v-flex>
                                <v-flex xs2>
                                  <v-btn
                                  flat
                                  fab
                                  color="cyan lighten-1">
                                    <v-icon>forward</v-icon>
                                  </v-btn>
                                </v-flex>
                            </v-layout>
                            </v-flex>
                            </v-flex>
                          </v-layout>
                          
                          <v-card flat>
                          <v-flex my-2
                          >
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
        
  
      
  
    </v-container>
</template>

<script>


export default {
  data () {
      return {
        
      }
    },
methods: {
     hasProfilePic(imageUrl){
            console.log(imageUrl)
         if(imageUrl != null){
        
           return true
         }else{
           
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


