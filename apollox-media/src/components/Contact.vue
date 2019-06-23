<template>

    <v-container>
        <v-layout justify-center my-3 >
   <v-card flat>
    <v-card-text>
    
    <span style="font-size:30px"><u>Contact Us</u></span>
    </v-card-text>
  </v-card>
  </v-layout>
        <v-flex xs12 sm6 offset-sm3>
        <v-card>
           
                
        <v-flex  justify-center >
        <v-select attach
          :items="items"
          box
          v-model="select"
          label="Topic"
          outline
        ></v-select>
          <v-textarea
        id="contactUs"
        v-model="contactUs"
        counter
        maxlength="500"
        full-width
        single-line
        outline
      ></v-textarea>
      </v-flex>
      <span style="font-size:20px">We will be in touch with you as soon as possible on your related topic. Any feedback on how the site looks or operates is great for the success and growth of ApolloX Media. </span>
      <v-layout justify-center my-3 >
      <v-btn color="blue "
    outline
    type="submit" 
    @click="submitForm"
    >Submit Form</v-btn>
      </v-layout>
  
           
          </v-card>
    </v-flex>
    </v-container>
</template>

<script>
  export default {
    
     data () {
      return {
        items: ['Advertising ', 'Business Inquiries', 'Website Feedback', 'Other']
      }
     },
     methods:{
       submitForm(){
      this.$store.dispatch('ContactForm', {topic: this.select, text: this.contactUs})
      this.$router.push('/')

       }
     }
  }

 
</script>