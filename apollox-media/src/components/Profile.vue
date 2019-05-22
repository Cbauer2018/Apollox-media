<template>
<v-container>
    <header>
        <v-layout align-start justify-start row column>
            <v-layout my-3 row>
                <v-flex xs4 ml-4>
        <v-avatar
          :tile="tile"
          :size="140"
          color="grey lighten-4"
        >
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>
    </v-flex>
            <v-layout row>
      <v-flex xs6 ml-5>
      <h2 class = "display-1 font-weight-thin">
          Username
        </h2>
        
        <v-flex ml-4 my-3>
        <span>
          Bio Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus consequuntur natus enim ipsum, voluptatibus adipisci, quisquam eveniet eligendi aut recusandae nesciunt? Eaque autem amet harum? Explicabo laboriosam iste amet cumque.
        </span>
        </v-flex>
        </v-flex>
        <v-layout align-end justify-start column>
        <v-flex xs2 my-2>
        <h2 class = "font-weight-thin">Followers: 0</h2>
        </v-flex>
        
        
        <v-flex my-2>
        <h2 class = "font-weight-thin">Following: 0</h2>
        </v-flex>
        </v-layout>
        </v-layout>
          
            </v-layout>
            <v-layout row>
         <div class="text-xs-left">
    <v-rating v-model="rating"
              hover
              color = "blue"
              background-color="blue darken-4"
              readonly
              value="0"
    ></v-rating>
    <v-layout justify-end>
        <span> 
        16.7k
        </span>
        </v-layout>
        </div>
        </v-layout>
        </v-layout>

    </header>
    <v-card flat class = "pa-2">
      <v-layout row wrap>
      <v-flex my-5 xs10>
        <div class= "title font-weight-thin">Posts</div>
      </v-flex>
      <v-flex my-5 xs2>
        <div class= "title font-weight-thin">Date Created</div>
      </v-flex>
      </v-layout>
    </v-card>

</v-container>

</template>

<script>
export default{
  data(){
    return{

      rating: 4
    }
  }
}
</script>