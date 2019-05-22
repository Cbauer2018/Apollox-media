<template>
<v-container>
  <v-flex xs12 sm6 offset-sm3  v-if="!userIsAuthenticated">
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
                      name="Title"
                      label="Title"
                      id="title"
                      v-model="text"
                      type="text"
                      :rules="rules"
                      counter="50"
                      required
                      maxlength="50"></v-text-field>
                    </v-flex>
                     <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="Name of Person/Organization You are Fact Checking "
                      id="Link"
                      v-model="text"
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
                      id="Link"
                      v-model="text"
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
    v-show="newForm">

    <span>
      New Review
    </span>
       <v-textarea
        v-model="title"
        counter
        maxlength="1500"
        full-width
        single-line
        outline
      ></v-textarea>
    </v-layout>

      <span>In Summary:</span>
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
                  <v-flex xs12>
                    <v-text-field
                     v-for="i in this.wrongCount"
                     :key="i.number"
                      name="Wrong List"
                      label="*"
                      id="wrongList"
                      v-model="text"
                      type="text"
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
                     v-for="j in this.rightCount"
                     :key="j.number"
                      name="Right List"
                      label="*"
                      id="rightList"
                      v-model="text"
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
                     v-for="j in this.notIncludedCount"
                     :key="j.number"
                      name="Right List"
                      label="*"
                      id="rightList"
                      v-model="text"
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
    <v-btn color="cyan lighten-3">Post</v-btn>
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
        rules: [v => v.length <= 50 || 'Max 50 characters'],
        newForm:true,
         wrongCount:[{number:1}],
         rightCount:[{number:1}],
         notIncludedCount:[{number:1}],

      }
    },
    methods:{
      changeForm (form){
        if(form == true){
          this.newForm = true
        }else{
          this.newForm= false
        }
       
        return this.newForm
      },

      addWrongBullet(){
        
        if(this.wrongCount.length < 10){
          var n = this.wrongCount.length + 1;
         this.wrongCount.push({number:n})
        }
        return this.wrongCount
      },

      removeWrongBullet(){
        if(this.wrongCount.length > 1){
  
          this.wrongCount.pop();
        }
      },


      addRightBullet(){
        if(this.rightCount.length < 10){
          var n = this.rightCount.length + 1;
         this.rightCount.push({number:n})
        }
        return this.rightCount
      },
      removeRightBullet(){
        if(this.rightCount.length > 1){
          this.rightCount.pop();
        }
      },

       addNotIncludedBullet(){
        if(this.notIncludedCount.length < 10){
          var n = this.notIncludedCount.length + 1;
         this.notIncludedCount.push({number:n})
        }
        return this.notIncludedCount
      },
      removeNotIncludedBullet(){
        if(this.notIncludedCount.length > 1){
          this.notIncludedCount.pop();
        }
      },
    },
    computed: {
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
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