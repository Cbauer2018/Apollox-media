<template>
    <container>
        <v-layout row wrap>
            <v-flex xs4 md2>
                <v-card flat>
                    <v-flex v-for="profile in profile" :key="profile" ma-4>
                        <v-layout column>
                            <v-avatar
                                :size="75"
                                color="grey lighten-4">
                              <img 
                                    v-if="hasProfilePic" 
                                    :src="profile.imageUrl" alt="avatar">
                                    <img v-else src="@/assets/RocketLogo.png">
                            </v-avatar>
                            <v-flex my-2>
                                <span>{{profile.username}}</span>
                            </v-flex>
                            <v-flex my-3 v-for="post in post" :key="post">
                              <h2 class="font-weight-thin">{{post.date}}</h2>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-card>
            </v-flex>
            <v-flex xs6 md8>
            <v-layout column>
                <v-flex my-4>
                    <v-card v-for="post in post" :key="post" flat>
                        <h3 class="display-2 font-weight-thin">{{post.title}}</h3>
                        <v-flex my-4>
                        <h2 class="font-weight-thin"><p class = "tab">{{post.newReview}}</p></h2>
                        </v-flex>
                        <v-list>
          <v-list-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile color="green">
                <v-list-tile-content>
                  <v-list-tile-title>What is Correct</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile 
            v-for="text in post.rightList"
              :key="text.text">
              <v-list-tile-content >
                <span>* {{text.text}}</span>
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
              <v-list-tile-content>
                <span>* {{text.text}} </span>
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
                <span>* {{text.text}}</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          
        </v-list>

    <v-layout column>
        <v-layout row wrap>
                              <v-flex sm10 md6 my-3>
                                    <v-layout>
                                        <v-rating
                                            v-on:click="ratePost"
                                            v-model="rating"
                                            hover
                                            color = "cyan lighten-1"
                                            background-color="cyan lighten-1"
                                            half-increments></v-rating>
                                        <v-rating 
                                            v-on:click="ratePost"
                                            v-model="rating"
                                            hover
                                            readonly
                                            color = "cyan lighten-1"
                                            background-color="cyan lighten-1"
                                            half-increments></v-rating>
                                        <v-flex my-3 ml-1>
                                            12
                                        </v-flex>
                                    </v-layout>
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
                            <v-layout row>
                            <v-flex xs2>
                                
                            </v-flex>
                            <v-flex xs8>
                                
                                <v-list>
          <v-list-group
            
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title >Comments</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-flex>
            <v-list-tile
            v-for="text in post.comments"
              :key="text.text">
              <v-list-tile-content >
                  <v-layout row>
                      
                      <v-flex my-4 ml-2
                       >
                        <span>{{text.username}}</span>
                        </v-flex>
                    <v-flex my-4 ml-3>
                        <span>{{text.comment}}</span>
                    </v-flex>
                </v-layout>
              </v-list-tile-content>
            </v-list-tile>
            </v-flex>
          </v-list-group>
          </v-list>
                            </v-flex>
                            
                            </v-layout>
                        </v-layout>
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
         

      
    },
     methods:{
            postComment(post){
      var profileUid = this.$route.params.uid
     console.log("uid", profileUid)
     console.log("postKey", this.$route.params.post)
     console.log("comment", this.comment)
      if(this.comment != '' && this.comment != null){
    
      this.$store.dispatch('postComment', {uid: profileUid, postKey: this.$route.params.post, comment: this.comment})
        this.comment = ''
      }
      
    },
        ratePost(){

        },

           hasProfilePic(){
             let profile = this.profile
             
            if(this.profile[0].imageUrl != null){
        
           return true
         }else{
            
           return false
         }
       },
       }
}
</script>

<style>
  .tab { text-indent: 40px; }
</style>
