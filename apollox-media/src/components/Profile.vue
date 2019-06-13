  <template>
    <container>
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
                <v-layout row>
                <v-rating 
                  v-model="rating"
                  hover
                  color = "cyan lighten-1"
                  background-color="cyan lighten-1"
                  readonly
                  half-increments>      
                </v-rating>
                <v-flex my-3 ml-1>
                <span>
                  16.7k
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
          <v-flex my-2>
              <span>
                {{ profile.bio }}
              </span>
          </v-flex>
          </v-flex>
          </v-card>
        </v-flex>
        
        <v-flex xs6 sm3>
          <v-card flat>
            <v-layout column wrap>
              <v-flex ml-3>
                  <h2 class = "font-weight-thin">Followers {{followers}}</h2>
              </v-flex>
              <v-flex ml-3 my-2>
                  <h2 class = "font-weight-thin">Following {{following}}</h2>
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
            <v-btn 
                  router
                  :to="'/Profiles/Edit'"
                  fab small
                  outline color="cyan lighten-2">
              <v-icon>
                settings
              </v-icon>
            </v-btn>
            </v-flex>
          </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs1>
          <v-card flat></v-card>
        </v-flex>
      </v-layout>
      
      

      
        <container>
          <v-layout row>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          <v-flex xs8>
          <v-card class = "pa-2">
              <v-layout row>
                    <v-flex my-2 xs11>
                        <div class= "title font-weight-thin">Posts</div>
                    </v-flex>
                    <v-flex my-2 xs1>
                        <div class= "title font-weight-thin">Date</div>
                    </v-flex>
              </v-layout>
          </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          </v-layout>

        <v-layout row wrap>
              <v-flex xs2>
                <v-card></v-card>
              </v-flex>
                    <v-flex xs8>
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
                            <img :src="imageUrl" alt="avatar">
                        </v-avatar>
                        <v-flex my-3>
                        <h4 class = "font-weight-thin">
                          {{post.username}} </h4>
                          </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-layout column>
                          <v-flex my-2 ml-5>
                          <h1 @click="viewPost(post)" class = "font-weight-thin">{{post.title}}</h1>
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
                                v-model="rating"
                                hover
                                color = "cyan lighten-1"
                                background-color="cyan lighten-1"
                                readonly
                                half-increments></v-rating>
                              </v-flex>
                              <v-flex md2 my-4>
                                  12
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


                                 <v-list-group >
            <template active v-slot:activator>
              <v-list-tile color="black">
                <v-list-tile-content>
                  <v-list-tile-title>Comments</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
            v-for="text in post.comments"
              :key="text.text">
              <v-list-tile-content>
                <v-card  justify-center wrap>
                       <v-layout align-center row wrap>
               <v-avatar
                :tile="tile"
                :size="45"
                color="grey lighten-4">
                <img 
                v-if="userHasProfilePic(text.imageUrl)" 
                :src="text.imageUrl" alt="avatar">
                <img v-else src="@/assets/RocketLogo.png">
              </v-avatar>
              <v-layout align-center row wrap>
                <v-flex>

                  <v-card> <span >{{text.username}}: </span></v-card>
                     <v-card> <span>  {{text.comment}}</span></v-card>
                    <v-card> <span >{{text.date}}</span></v-card>
                   <v-card><v-btn flat
                              fab
                        color="cyan lighten-1"><v-icon>keyboard_arrow_up</v-icon></v-btn>
                    <span style="font-weight: bold;">{{text.upvotes}}</span></v-card>
                </v-flex>
                  
                    
                    </v-layout>
              </v-layout>
             
                    </v-card>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
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
        </container>
        </v-flex>
        <infinite-loading ref="InfiniteLoading" @infinite="infiniteHandler"></infinite-loading>
    </container>
  </template>

<script>
import Popup from './profilePopup'
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
      rating: 3.3,
      followArray: [{word: "Follow"}, {word: "Following"}],
      followIconArray: [{icon: "add"}, {icon: ""}],
      popUpUnfollow: [],
      numberI: 0,
      followers: 0,
      following:0,
     postCount: 2
      

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
        }
    
      
      
    },
   
    

    methods:{
    
       infiniteHandler($state){
        var profileUid = this.$route.params.uid
        console.log(this.loadProfilePosts.length + "vs" + this.postCount)
        this.$store.dispatch('loadProfilePosts', {uid: profileUid ,index: this.loadProfilePosts.length + 2})
        if(this.loadProfilePosts.length == this.postCount){
          setTimeout(() => {
        $state.loaded()
        this.postCount += 2
        console.log(this.loadProfilePosts.length + "vs" + this.postCount)
      }, 1500);
        }else{
            console.log(this.loadProfilePosts.length + "vs" + this.postCount)
          $state.complete()
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
            console.log(imageUrl)
         if(imageUrl != null){
        
           return true
         }else{
           
           return false
         }
       },
       

    },

    


}
</script>