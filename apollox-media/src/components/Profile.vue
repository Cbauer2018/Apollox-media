  <template>
    <container>
       <title>Apollox Media Profile</title>
       <meta name="Description" content="ApolloX Media is a news platform that is aimed at providing people with an unbiased news community they can trust. The platform promotes highlighting biases and facting checking of various modes of media such as: Articles, Videos, Speeches, Debates and many more!">
     <div v-responsive.lg.xl >
   <v-flex xs4 offset-sm4 my-5 v-if="!userIsAuthenticated">
        <v-card>
          <v-card-text>
            <v-container>
              <v-layout justify-center>
                  <h2 class="display-1 font-weight-thin">
                     Login or Signup to View Profile
                  </h2>
              </v-layout>
              <v-flex>
            <v-layout mt-5 justify-center>
              <v-btn 
                  router
                  :to="'/Login'"
                  outline large round color="cyan lighten-2">
                  Login
              </v-btn>
              <v-btn
                  router
                  :to="'/Signup'" 
                  outline large round color="cyan lighten-2">
                  SignUp
              </v-btn>
            </v-layout>
              </v-flex>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      </div>

<div v-responsive ="['hidden-all','xs','sm', 'md']" >
   <v-flex  v-if="!userIsAuthenticated">
        <v-card>
          <v-card-text>
            <v-container>
              <v-layout justify-center>
                  <h2 class="display-1 font-weight-thin">
                     Login or Signup to View Profile
                  </h2>
              </v-layout>
              <v-flex>
            <v-layout mt-5 justify-center>
              <v-btn 
                  router
                  :to="'/Login'"
                  outline large round color="cyan lighten-2">
                  Login
              </v-btn>
              <v-btn
                  router
                  :to="'/Signup'" 
                  outline large round color="cyan lighten-2">
                  SignUp
              </v-btn>
            </v-layout>
              </v-flex>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      </div>










        <v-flex v-if="userIsAuthenticated">
      <v-layout my-5 row wrap>
        <v-flex xs1>
          <v-card></v-card>
        </v-flex>
        
        <v-flex sm6 md3>
          <v-card flat>
            <v-layout column>
              <v-flex ml-4 >
              <v-avatar v-for="profile in profile"
                :key="profile"
                :tile="tile"
                :size="140"
                color="grey lighten-4">
                <img 
                v-if="hasProfilePic" 
                :src="profile.imageUrl" alt="avatar">
                <img v-else src="@/assets/RocketLogo.png">
              </v-avatar>
              </v-flex>
              <v-flex>
                <v-layout row v-for="profile in profile" 
                :key="profile">
                <v-rating 
                 :value="profile.profileRating"
                  hover
                  color = "cyan lighten-1"
                  background-color="cyan lighten-1"
                  readonly
                  half-increments>      
                </v-rating>
                <v-flex my-3 ml-1>
                <span>
                  {{profile.totalVotes}}
                </span>
                </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        
        
        <v-flex xs8 sm5>
          <v-card flat>
            <v-flex
                v-for="profile in profile" 
                :key="profile">
                  <h2 class = "display-1 font-weight-thin">
                    {{  profile.username }} </h2>
         <p  class="font-weight-thin"><kbd>{{profile.bio}}</kbd></p>
         <title>Apollox Media {{profile.username}}</title>
   <meta name="Description" :content="profile.bio">
          </v-flex>
          </v-card>
        </v-flex>
        
        <v-flex xs6 sm3>
          <v-card flat>
            <v-layout column wrap>
              <v-flex ml-3>
                  <h2 class = "font-weight-thin myClickableThingy" @click="toFollowers">Followers {{followers}}</h2>
              </v-flex>
              <v-flex ml-3 my-2>
                  <h2 class = "font-weight-thin myClickableThingy" @click="toFollowing">Following {{following}}</h2>
              </v-flex>
                  <v-layout >
                    <v-flex ml-2>
                    <v-btn v-show="!userIdMatch && !isFollowing "
                       
                        v-on:click=" followProfile"
                        outline color="cyan lighten-2">
                       Follow
                <v-icon>
                    add
                </v-icon>
              </v-btn>

              <v-btn v-show="!userIdMatch && isFollowing "
                       
                        v-on:click=" unFollowProfile"
                        outline color="cyan lighten-2">
                       Following
                <v-icon>
                </v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-layout>

        <v-layout
            v-show="userIdMatch">
        <v-flex ml-5>
          <v-layout column>
            <v-btn 
                  router
                  :to="'/Profiles/Edit'"
                  fab small
                  outline color="cyan lighten-2">
              <v-icon>
                settings
              </v-icon>
            </v-btn>
            <span > Edit Profile</span>
            </v-layout>
            </v-flex>
          </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs1>
          <v-card flat></v-card>
        </v-flex>
      </v-layout>
      
      

      
        
        <v-layout row wrap>
              <v-flex>
                <v-card></v-card>
              </v-flex>
              
                    <v-flex xs12 >
                      <v-card
                          v-for="post in loadProfilePosts" 
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
        
        <infinite-loading ref="InfiniteLoading" @infinite="infiniteHandler"></infinite-loading>
        </v-flex>
        
    </container>
  </template>

<script>

import InfiniteLoading from 'vue-infinite-loading';
export default{
  components: {InfiniteLoading },
   props: ['id'],
  InfiniteLoading,
  
  data(){
    return{
      items: [
        {
          id: 1,
          name: 'What Facts were Correct:',
          children: [
           
          ]
        }
      ],
      
     
      imageUrl:require('@/assets/RocketLogo.png'),
     
      followArray: [{word: "Follow"}, {word: "Following"}],
      followIconArray: [{icon: "add"}, {icon: ""}],
      popUpUnfollow: [],
      numberI: 0,
      followers: 0,
      following:0,
     postCount: 1
      

    }
  },
beforeCreate() {
     
          this.$store.dispatch('loadProfile', {uid: this.$route.params.uid})
          this.$store.dispatch('loadProfilePosts', {uid: this.$route.params.uid , index:2})

    
  },
   computed: {
     
    
    userIdMatch () {
      return this.$store.getters.userId === this.$store.getters.loadedProfileId
    },
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      profile(){
        return this.$store.getters.loadedProfile;
      },
      hasProfilePic(){
    
      let profile = this.profile
    if(profile[0].followingCount != null){
             this.following = profile[0].followingCount
          }

    if(profile[0].followerCount != null){
      this.followers = profile[0].followerCount
      
             }


         if(profile[0].imageUrl!= null){
           this.imageUrl = profile[0].imageUrl
           return true
         }else{
           this.imageUrl = require('@/assets/RocketLogo.png')
           return false
         }
       },

        loadProfilePosts(){
         return this.$store.getters.loadedProfilePosts
    },

        isFollowing(){
            var isFollowing = false
            var userId = this.$store.getters.user.id
              for(let key in this.profile[0].followers){
                if(this.profile[0].followers[key] == userId){
              
                   isFollowing = true
                    break;
                }
              }
              return isFollowing
        },
        loading () {
        return this.$store.getters.loading
      }
    
      
      
    },
   
    

    methods:{
    
      infiniteHandler($state){
        if(this.loading == false){
        var profileUid = this.$route.params.uid
       
        this.$store.dispatch('loadProfilePosts', {uid: profileUid ,index: this.loadProfilePosts.length + 2})
        if(this.loadProfilePosts.length != this.postCount){
          setTimeout(() => {
        $state.loaded()
       
      
      }, 1000);
        }else{
     
          $state.complete()
        }
        this.postCount = this.loadProfilePosts.length
          }else{
            setTimeout(() => {
          
        $state.loaded()
        
        
      }, 1000);
        }
    },
     
      followProfile(){
 
      this.$store.dispatch('followProfile', {profileUid:this.profile[0].id}).then(
      this.$store.dispatch('loadProfile', {uid: this.$route.params.uid}),
      this.$store.dispatch('loadFollowingPosts')
      )
      this.followers += 1
    },

    unFollowProfile(){
      this.$store.dispatch('unFollowProfile', {profileUid:this.profile[0].id}).then(
        this.$store.dispatch('loadProfile', {uid: this.$route.params.uid}),
        this.$store.dispatch('loadFollowingPosts') 
        
      )
      this.followers --
    },

    viewPost(post) {
        var profileUid = this.$route.params.uid
        this.$store.dispatch('loadPost', {uid: profileUid, postKey: post.key})
        this.$router.push("/viewPost/" + profileUid+ '/' + post.key)
    },

    postComment(post){
      var profileUid = this.$route.params.uid
     
      if(this.comment != '' && this.comment != null){
    
      this.$store.dispatch('postComment', {uid: profileUid, postKey: post.key, comment: this.comment})
        this.comment = ''
      }
      
    },
     userHasProfilePic(imageUrl){
           
         if(imageUrl != null){
        
           return true
         }else{
           
           return false
         }
       },

       toFollowing(){
        var profileUid = this.$route.params.uid
        this.$store.dispatch('viewFollowing', {uid: profileUid})
        this.$router.push("/viewFollowing/" + profileUid)

       },
       toFollowers(){
          var profileUid = this.$route.params.uid
        this.$store.dispatch('viewFollowers', {uid: profileUid})
        this.$router.push("/viewFollowers/" + profileUid)
       }
       

    },

    


}

</script>

