<template>
<v-container>
  <v-flex xs12 sm6 offset-sm3  v-if="!userIsAuthenticated">
  <v-card>
          <v-card-text>
            <v-container>
              <v-layout justify-center>
                  <h2 class="display-1 font-weight-thin">
                     Login or Signup to Post
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
<v-layout justify-center my-3 >
   <v-card  flat color="cyan lighten-3" class="rounded-card">
    <v-card-text>
    <v-icon color="black" left>add_box</v-icon>
    <span style="font-size:30px">Create New Post</span>
    </v-card-text>
  </v-card>
  </v-layout>
  <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form>
                  <v-flex xs12>
                    <v-text-field
                      name="title"
                      label="Title"
                      v-model="title"
                      id="title"
                      type="text"
                     
                      counter="50"
                      required
                      maxlength="50"></v-text-field>
                    </v-flex>
                     <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="Name of Person/Organization You are Fact Checking "
                      id="personName"
                      v-model="personName"
                      type="Link"
                      maxlength="30"
                      counter="30"
                      single-line="true"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                    <v-text-field
                      name="Link"
                      label="Link to Article/Video You Are Reviewing "
                      id="reviewLink"
                       v-model="reviewLink"
                      type="Link"
                      single-line="true"
                      ></v-text-field>
                    </v-flex>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
    </v-flex>
    <v-layout justify-center>
      <v-btn outline
      @click="changeForm(false)">
        Post Link of Your Review
      </v-btn>
      <v-btn outline
      @click="changeForm(true)">
        Create New Review
      </v-btn>
    </v-layout>



    <v-layout column
    v-show="!newForm">
 <v-flex>
   <v-card>
   <v-card-text>
    <form xs12 sm6 offset-sm3>
        <v-flex xs12>
         <v-text-field
                      name="yourReviewLink"
                      label="Link to your review"
                      id="yourReviewLink"
                       v-model="yourReview"
                      type="text"
                       counter="150"
                      required
                      maxlength="150"></v-text-field>
              </v-flex>
     </form>
     </v-card-text>
     </v-card>
 </v-flex>
    </v-layout>

     <v-layout column
    v-show="newForm">

    <span>
      New Review
    </span>
       <v-textarea
        id="newReview"
         v-model="newReview"
        counter
        maxlength="1500"
        full-width
        single-line
        outline
      ></v-textarea>
    </v-layout>

    
      <v-flex my-4>
      <span>In Summary:</span>
      </v-flex>
      <v-layout column>
      <h2 my-1>What Facts were Incorrect: </h2>
      <v-flex my-3 outline>
        <v-card>
          <v-card-text>
            <v-container>
              <form>
                <v-layout>
                <v-flex xs12 sm3>
            <v-btn @click="addWrongBullet" flat color="red">
              <v-icon>add_box</v-icon>
              Add Bullet point
            </v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm3>
            <v-btn @click="removeWrongBullet" flat color="red">
              <v-icon>remove</v-icon>
              Remove Bullet Point
            </v-btn>
          </v-flex>   
          </v-layout>
                  <v-flex xs12 >
                    <v-text-field
                     v-for="i in wrongList"
                     :key="i"
                      name="Wrong List"
                      label="*"
                      v-model="i.text"
                      type="input"
                      counter="100"
                      maxlength="100"></v-text-field>
                    </v-flex>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
    </v-flex>


    <h2 my-1>What Facts were Correct: </h2>
      <v-flex my-3 outline>
        <v-card>
          <v-card-text>
            <v-container>
              <form>
                <v-layout>
                <v-flex xs12 sm3>
            <v-btn @click="addRightBullet" flat color="green">
              <v-icon>add_box</v-icon>
              Add Bullet point
            </v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm3>
            <v-btn @click="removeRightBullet" flat color="green">
              <v-icon>remove</v-icon>
              Remove Bullet Point
            </v-btn>
          </v-flex>   
          </v-layout>
                  <v-flex xs12>
                    <v-text-field
                     v-for="j in this.rightList"
                     :key="j"
                      name="Right List"
                      label="*"
                      v-model='j.text'
                      counter="100"
                      maxlength="100"
                      ></v-text-field>
                    </v-flex>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
    </v-flex>
    </v-layout>

     <h2 my-1>What Important Fact were Missing: </h2>
      <v-flex my-3 outline>
        <v-card>
          <v-card-text>
            <v-container>
              <form>
                <v-layout>
                <v-flex xs12 sm3>
            <v-btn @click="addNotIncludedBullet" flat color="yellow darken-3">
              <v-icon>add_box</v-icon>
              Add Bullet point
            </v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm3>
            <v-btn @click="removeNotIncludedBullet" flat color="yellow darken-3">
              <v-icon>remove</v-icon>
              Remove Bullet Point
            </v-btn>
          </v-flex>   
          </v-layout>
                  <v-flex xs12>
                    <v-text-field
                     v-for="j in this.notIncludedList"
                     :key="j"
                      name="not Included List"
                      label="*"
                      v-model='j.text'
                      type="text"
                      counter="100"
                      maxlength="100"
                      ></v-text-field>
                    </v-flex>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
    </v-flex>
   
      <v-layout justify-center> 
    <v-btn color="cyan lighten-3"
    @click="submitPost"
    type="submit" :disabled="loading" :loading="loading"
    
    >Post</v-btn> 
    </v-layout>
</v-flex>
  

</v-container>

</template>



<script>


export default {
  name:'Post',
  components:{
   
    
  },

  data () {
    
      return {
        newForm:true,
         wrongList:[{text:''}],
        rightList:[{text:''}],
        notIncludedList:[{text:''}],


      }
    },
    methods:{
      submitPost(){
        console.log("wrongList",this.wrongList)
        console.log("rightList", this.rightList)
        console.log("title=", this.title)
        if(this.newForm){
          console.log(true)
          this.yourReview= 'null'
        this.$store.dispatch('submitPost', {title: this.title, personName: this.personName, reviewLink: this.reviewLink, newReview: this.newReview,yourReview:this.yourReview, newForm: this.newForm, wrongList: this.wrongList, rightList:this.rightList, notIncludedList:this.notIncludedList})
        }else{
          console.log(false)
          this.newReview='null'
            this.$store.dispatch('submitPost', {title: this.title, personName: this.personName, reviewLink: this.reviewLink, newReview: this.newReview, yourReview: this.yourReview, newForm: this.newForm, wrongList: this.wrongList, rightList:this.rightList, notIncludedList:this.notIncludedList})
        }

        this.$router.push('/Recent')
        
      },
      changeForm (form){
        if(form == true){
          this.newForm = true
          console.log(true)
        }else{
          this.newForm= false
          console.log(false)
        }
       
        return this.newForm
      },

      addWrongBullet(){
        
        if(this.wrongList.length < 10){
         this.wrongList.push({text:' '})
        }
        
      },

      removeWrongBullet(){
        if(this.wrongList.length > 1){
          this.wrongList.pop();
        }
      },


      addRightBullet(){
        if(this.rightList.length < 10){
        
         this.rightList.push({text:''})
        }
       
      },
      removeRightBullet(){
        if(this.rightList.length > 1){
          this.rightList.pop();
        }
      },

       addNotIncludedBullet(){
        if(this.notIncludedList.length < 10){
          this.notIncludedList.push({text:''})
        }
        
      },
      removeNotIncludedBullet(){
        if(this.notIncludedList.length > 1){
          this.notIncludedList.pop();
        }
      },
    },
    computed: {
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },

      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    }
 
}
</script>

<style lang="css">
  .rounded-card{
    border-radius:50px;
}
  .round-button{
    border-radius:200px;
  }
</style>