<template>
<v-container>
  <v-layout justify-center>
  <v-flex xs5  my-3 v-if="!userIsAuthenticated">
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
  </v-layout>


  <v-flex v-if="userIsAuthenticated">
    <form @submit.prevent="checkForm">
<v-layout justify-center my-3 >
   <v-card flat>
    <v-card-text>
    <v-icon color="black" left>add_box</v-icon>
    <span style="font-size:30px"><u>Create New Post</u></span>
    </v-card-text>
  </v-card>
  </v-layout>
  <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form required>
                  <v-flex xs12>
                    <v-text-field
                      name="title"
                      label="Title"
                      v-model="title"
                      id="title"
                      type="text"
                      counter="100"
                      required
                      maxlength="100"></v-text-field>
                    </v-flex>
                     <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="Name of Person/Organization You are Fact Checking "
                      id="personName"
                      v-model="personName"
                      type="Link"
                      maxlength="50"
                      counter="50"
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
        maxlength="4500"
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
                      counter="200"
                      maxlength="200"></v-text-field>
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
                      counter="200"
                      maxlength="200"
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
                      counter="200"
                      maxlength="200"
                      ></v-text-field>
                    </v-flex>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
           <v-layout justify-center> 
    <v-btn color="cyan lighten-3"
    type="submit" 
    >Post</v-btn> 
    </v-layout>
    </v-flex>
   
     </form>
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
      checkForm: function (e) {
       if(this.newForm){
      if (this.title && this.personName && this.reviewLink && this.rightList && this.wrongList && this.notIncludedList && this.newReview ) {
        this.submitPost()
        return true;
      }
       if (!this.title) {
         
        alert('Title is required.')
      }
      if (!this.personName) {
        alert('Name of Person you are fact checking is required.');
      }
        if(!this.reviewLink){
          alert('Link to Article/Video you are reviewing is required.');
        }
        if(!this.newReview){
          alert('New Review Field is required');
        }
          var i = 0  
         while( i < this.rightList.length){
          console.log(this.rightList[i])
          if(this.rightList[i].text == ""){
          alert('Correct Bullet Point is required.');
        }
          i++;
        }
          var j = 0
        while( j < this.wrongList.length){
          console.log(this.wrongList[j])
          if(this.wrongList[j].text == ""){
          alert('Incorrect Bullet Point is required.');
        }
          j++;
        }
        
      
        
      
        }else{
          
        if (this.title && this.personName && this.reviewLink && this.rightList && this.wrongList && this.notIncludedList && this.yourReview) {
          this.submitPost();
        return true;

      }

      
       if (!this.title) {
        alert('Title is required.')
      }
      if (!this.personName) {
        alert('Name of Person you are fact checking is required.');
      }
        if(!this.reviewLink){
          alert('Link to Article/Video you are reviewing is required.');
        }
        if(!this.yourReview){
          alert('Your Review Link is required');
        }
         var i = 0  
         while( i < this.rightList.length){
          console.log(this.rightList[i])
          if(this.rightList[i].text == ""){
          alert('Correct Bullet Point is required.');
        }
          i++;
        }
          var j = 0
        while( j < this.wrongList.length){
          console.log(this.wrongList[j])
          if(this.wrongList[j].text == ""){
          alert('Incorrect Bullet Point is required.');
        }
          j++;
        }
         
        }

      e.preventDefault();
    },
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
        this.$store.dispatch('loadRecentPosts')
        
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
         this.wrongList.push({text:''})
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