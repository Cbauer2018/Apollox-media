import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
     
      user: null,
      loading: false,
      error: null
    },
    mutations: {
     
      setUser (state, payload) {
        state.user = payload
      },
      setLoading (state, payload) {
        state.loading = payload
      },
      setError (state, payload) {
        state.error = payload
      },
      clearError (state) {
        state.error = null
      }
    },
    actions: {
     
      signUserUp ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = {
                id: user.user.uid,
                username: payload.username,
                email: payload.email,

                monthCreated: new Date().getMonth(),
                dayCreated:  new Date().getDate(),
                yearCreated: new Date().getFullYear()
                
                
              }
              console.log(new Date().getDate())
              console.log(user.user.uid)
              firebase.database().ref('Users').child(newUser.id).set(newUser)
              commit('setUser', newUser)
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              
            }
          )
      },
      submitPost({commit}, payload){

        const newPost ={
          title: payload.title,
          personName: payload.personName,
          reviewLink: payload.reviewLink, 
          newReview: payload.newReview,
          yourReview: payload.yourReview
        }

       // if(payload.newForm){ 
        //   newPost.yo
        // }}else{
        //    newPost ={
        //     title: payload.title,
        //     personName: payload.personName,
        //     reviewLink: payload.reviewLink, 
        //     newReview: payload.newReview,
        //     yourReview: payload.yourReview
        //   }
        // }
          
        console.log("uid=",firebase.auth().currentUser.uid.toString())
            firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString()).child('Posts').push(newPost)

            commit('submitPost',newPost)
      },

      signUserIn ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = {
                id: user.user.uid,
               
              }
              commit('setUser', newUser)
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              
            }
          )
      },
      autoSignIn({commit}, payload){
        commit('setUser', {id: payload.uid})
      },
      logout({commit}){
        firebase.auth().signOut()
        commit('setUser', null)
      },

      clearError ({commit}) {
        commit('clearError')
      },
      
    },
    getters: {
      
      user (state) {
        return state.user
        console.log(state)
      },
      loading (state) {
        return state.loading
      },
      error (state) {
        return state.error
      }
    }
  })