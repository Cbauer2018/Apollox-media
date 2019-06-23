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
                              <img @click="goToProfile(profile.id)" class="myClickableThingy"
                                    v-if="hasProfilePic" 
                                    :src="imageUrl" alt="avatar">
                                    <img @click="goToProfile(profile.id)" class="myClickableThingy" v-else :src="imageUrl">
                            </v-avatar>
                            <v-flex my-2>
                                <span  @click="goToProfile(profile.id)" class="myClickableThingy">{{profile.username}}</span>
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
                        <h2 class="font-weight-thin" v-if="post.newReview != 'null'" ><p class = "tab" >{{post.newReview}}</p></h2>

                        <v-card  v-else justify-center class="myClickableThingy" @click="goToReview(post.yourReview)" >
                          <v-layout row wrap >
                             <link-prevue :url="post.yourReview" >
                            <template slot-scope="props">
                            <div class="card" style="width: 20rem;">
                            <img class="card-img-top" style="width: 15rem; height: 15rem;" :src="props.img" :alt="props.title">
                            <div class="card-block" >
                          <h4 class="card-title" >{{props.title}}</h4>
                            
                                 </div>
                              </div>
                              </template>
                             </link-prevue>

                             <v-card-actions class="justify-center">
                         <h1 class="font-weight-thin" ><a href="" @click="goToReview(post.yourReview)" >{{post.yourReview}}</a></h1>
                             </v-card-actions>
                          
                            </v-layout>
                           </v-card>
                       
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
                                        v-show="canUserVote && canVote "
                                            @input="ratePost"
                                            v-model="rating"
                                            hover
                                            color = "cyan lighten-1"
                                            background-color="cyan lighten-1"
                                            half-increments></v-rating>
                                        <v-rating 
                                         v-show="!canUserVote"
                                          
                                            :value="post.rating"
                                            hover
                                            readonly
                                            color = "cyan lighten-1"
                                            background-color="cyan lighten-1"
                                            half-increments></v-rating>
                                        <v-flex my-3 ml-1  >
                                            {{post.voters}}
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                              <v-flex v-show="userIsAuthenticated" xs8 md4>
                                <V-text-field
                                maxlength = "300"
                                v-model="comment"
                               v-on:keyup.enter="postComment(post)"
                                placeholder="Comment..."></V-text-field>
                                </v-flex>
                                <v-flex v-show="userIsAuthenticated" xs2>
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
                          
                            
                            </v-layout>

                          <v-flex>
                            <v-card flat>
                              <v-layout row>
                                  <h3 class="display-1 font-weight-thin">Comments</h3>
                                  <v-flex xs8>
                                    <v-card></v-card>
                                  </v-flex>
                                <v-flex my-1>
                                  <v-btn
                                  flat
                                  color="cyan lighten-2" class="font-weight-thin" v-if="HideComments == false" @click="hideComments">
                                  Hide Comments
                                  </v-btn>
                                     <v-btn
                                  flat
                                  color="cyan lighten-2" class="font-weight-thin" v-else @click="hideComments">
                                  Show Comments
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                              <v-layout column>
                              <v-flex v-show="!HideComments"
                                      v-for="text in post.comments"
                                      :key="text.text">
                                      
                                      <v-flex mt-3>
                                        <v-layout row>
                                          <v-avatar
                                              :size="50"
                                              color="grey lighten-4">
                                            <img class="myClickableThingy" @click="goToProfile(text.uid)"
                                              v-if="commentHasProfilePic(text)" 
                                              :src="text.imageUrl" alt="avatar">
                                            <img v-else :src="require('@/assets/RocketLogo.png')" class="myClickableThingy" @click="goToProfile(text.uid)">
                                          </v-avatar>
                                      
                                      <v-flex ml-5 mt-3>
                                        <span>{{text.comment}}</span>
                                    
                                    </v-flex>
                                    </v-layout>
                                    </v-flex>
                                    <v-flex mt-1>
                                    <span class="myClickableThingy" @click="goToProfile(text.uid)">{{text.username}}</span>
                              </v-flex>
                              </v-flex>
                              </v-layout>
                            </v-card>
                            </v-flex>

                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
            </v-flex>
        </v-layout>
    </container>
</template>


<script>
import LinkPrevue from 'link-prevue'
export default{
components:{
    LinkPrevue
  },
 
    data () {
      return {
        rating: 0,
        canUserVote : true,
        imageUrl: require('@/assets/RocketLogo.png'),
        commentImage:require('@/assets/RocketLogo.png'),
        HideComments: false
    

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
       userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },

        post(){
            return this.$store.getters.loadedPost;
        },
        canVote(){
          var canVote = true
          if(this.$store.getters.user !== null && this.$store.getters.user !== undefined){
          if(this.$store.getters.userId !== this.$route.params.uid){
            for(let i in this.post[0].voterIds){
              
              if(this.post[0].voterIds[i] == this.$store.getters.userId){
                canVote = false
              }
            }
          }else{
            canVote = false
          }
          }else{
            canVote =false
          }
          
         this.canUserVote =  canVote
         return canVote
        },
        hasProfilePic(){
             let profile = this.profile
             
            if(this.profile[0].imageUrl != null){
              this.imageUrl = this.profile[0].imageUrl
           return true
         }else{
            this.imageUrl = require('@/assets/RocketLogo.png')
           return false
         }
       },
        

       
         

      
    },
     methods:{
            postComment(post){
      var profileUid = this.$route.params.uid
    
      if(this.comment != '' && this.comment != null){
  
      this.$store.dispatch('postComment', {uid: profileUid, postKey: this.$route.params.post, comment: this.comment})
        this.comment = ''
      
      }
      
    },
        ratePost(){
          console.log(this.rating)
         var uid = this.$store.getters.userId
            var profileUid = this.$route.params.uid
             
             this.$store.dispatch('ratePost', {uid: uid, postUid: profileUid, postKey: this.$route.params.post, rating: this.rating} )
              this.$store.dispatch('loadPost', {postKey: this.$route.params.post, uid: this.$route.params.uid})
              this.canUserVote = false
        },
         commentHasProfilePic(comment){
             
             
            if(comment.imageUrl != null){
             
           return true
         }else{
           
           return false
         }
       },
       goToReview(link){

         if(link.includes('https://')){
          window.open(link)
         }else{
            window.open('https://'+link)
         }

       },
      goToProfile(profileUid){
      console.log(profileUid)
          this.$store.dispatch('loadProfile', {uid: profileUid})
          this.$store.dispatch('loadProfilePosts', {uid: profileUid, index: 2})
          this.$router.push('/Profile/'+ profileUid)
         

    },
    hideComments(){
      console.log(this.HideComments)
      if(this.HideComments == false){
        this.HideComments = true
      }else{
         this.HideComments = false
      }
    }
       

           
       }
}
</script>

<style>
  .tab { text-indent: 40px; }
</style>
