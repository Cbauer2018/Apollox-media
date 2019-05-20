<template>
<v-layout justify-center my-3 >
   <v-card  flat color="cyan lighten-3" class="rounded-card">
   
    <v-card-text>
    <v-icon color="cyan" left>add_box</v-icon>
    <span style="font-size:30px">Create New Post</span>
    </v-card-text>
  </v-card>
  </v-layout>
</template>



<script>
export default {
  name:'Post',
  components:{
   
    
  },

  data () {
      return {
      }
    },
    methods:{
      
    }
 
}
</script>

<style lang="css">
  .rounded-card{
    border-radius:50px;
}
</style>