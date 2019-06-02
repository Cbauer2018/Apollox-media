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
                <img v-else src="@/assets/astronautlogo.jpg">
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
                  <h2 class = "font-weight-thin">Followers 0</h2>
              </v-flex>
              <v-flex ml-3 my-2>
                  <h2 class = "font-weight-thin">Following 0</h2>
              </v-flex>
                  <v-layout v-show="!userIdMatch">
                    <v-flex ml-2>
                    <v-btn 
                        @click=" changeBtn"
                        outline color="cyan lighten-2">
                        {{followArray[this.numberI].word}}
                <v-icon>
                    {{followIconArray[this.numberI].icon}}
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
                  :to="'/Profile/Edit'"
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
      </v-flex>
      
        <container>
          <v-layout column>
          <v-layout row>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          <v-flex xs8>
          <v-card class = "pa-2">
              <v-layout row>
                    <v-flex my-2 xs10>
                        <div class= "title font-weight-thin">Posts</div>
                    </v-flex>
                    <v-flex my-2 xs2>
                        <div class= "title font-weight-thin">Date Created</div>
                    </v-flex>
              </v-layout>
          </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          </v-layout>

          <v-layout row>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          <v-flex xs8>
          <v-card class = "pa-2">
              <v-layout row>
                    <v-flex my-2 xs1>
                      <v-card>
                        <v-avatar
                        
                            :size="75"
                            color="grey lighten-4">
                            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
                        </v-avatar>
                        </v-card>
                    </v-flex>
                    <v-flex xs9>
                    <v-card>
                    <v-flex
                          v-for="profile in profile" 
                          :key="profile">
                          <h4 class = "font-weight-thin">
                          {{  profile.username }} </h4>
                    <v-flex my-2>
                      <h2 class = "font-weight-thin">Why Hillary Clinton Should go to Prison and be locked up for 57 years to life for money laundering and being a GILF</h2>
                      <v-flex my-2>
                      <span>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut natus repellat ullam nobis error impedit cum, quam quidem suscipit consectetur optio recusandae ut quibusdam quasi odio quae laboriosam aliquam doloremque!
                      </span>
                      </v-flex>
                    </v-flex>
                    <v-layout column wrap>
                      <v-flex xs1>
                      </v-flex>
                      <v-flex xs9>
                         <v-treeview class="text-truncate" :items="items"></v-treeview>
                      </v-flex>
                      <v-flex xs9>
                         <v-treeview class="text-truncate" :items="items"></v-treeview>
                      </v-flex>
                      <v-flex xs9>
                         <v-treeview class="text-truncate" :items="items"></v-treeview>
                      </v-flex>
                    </v-layout>
                    </v-flex>
                    </v-card>
                    </v-flex>
                    <v-layout>
                        <v-flex my-2 xs2>
                          <div class= "title font-weight-thin">05/29/2019</div>
                        </v-flex>
                    </v-layout>
              </v-layout>
          </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          </v-layout>

          <v-layout row>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          <v-flex xs8>
          <v-card class = "pa-2">
              <v-layout row>
                    <v-flex my-2 xs10>
                        
                    </v-flex>
                    <v-layout align-start>
                    <v-flex my-2 xs2>
                        <div class= "title font-weight-thin">05/29/2019</div>
                    </v-flex>
                    </v-layout>
              </v-layout>
          </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card></v-card>
          </v-flex>
          </v-layout>
          </v-layout>
        </container>
    </container>
  </template>

<script>
import Popup from './profilePopup'

export default{
  component: { Popup },
   props: ['id'],

  
  data(){
    return{
      items: [
        {
          id: 1,
          name: 'What Facts were Correct:',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome :  f f f ff f  fs d e fe ers  ds f ds s f ds  fsd    f sd   fdsf s f sd fd f ss f fdsf sd f sd  f sd ffds  f sdf sdf d f dsf sd f sd   ds f s ff d f ds f sd s d sd s d' },
            { id: 4, name: 'Webstorm : app' }
          ]
        }
      ],
      rating: 3.3,
      followArray: [{word: "Follow"}, {word: "Following"}],
      followIconArray: [{icon: "add"}, {icon: ""}],
      popUpUnfollow: [],
      numberI: 0

    }
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
      console.log(profile[0].imageUrl)


         if(profile[0].imageUrl!= null){
           
           return true
         }else{
           return false
         }
       },
        loadProfilePosts(){
      
    }
      
    },
   
    

    methods:{
    
      changeBtn () {
         if (this.numberI==0){
          this.numberI=1
        }
        else{
          this.numberI=0
        }
      },
       
    }


}
</script>