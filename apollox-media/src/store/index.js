import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
     
      loadedProfile: [],
      loadedRecentPosts:[],
      user: null,
      loading: false,
      error: null
    },
    mutations: {
      setLoadedRecentPosts(state, payload){
        state.loadedRecentPosts = payload
      },
      setLoadedProfile (state, payload) {
        state.loadedProfile = payload
        
      },
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
      
      loadProfile ({commit}) {
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString())
        .once('value').then((data) => {
          
          const obj = data.val()
          console.log("data",obj)
          const profile = []
          profile.push({
            dayCreated: obj.dayCreated,
            id: obj.id,
            monthCreated: obj.monthCreated,
            username: obj.username,
            yearCreated: obj.yearCreated,
            bio: obj.bio,
          })
            
            commit('setLoadedProfile', profile)
        })
      },

      loadRecentPosts({commit}){
          firebase.database().ref('Posts').orderByChild('timeStamp').once('value').then((data)=>{
              const Posts = []
              const obj = data.val()
            
             for (let key in obj){
                  Posts.push({
                    newReview: obj[key].newReview,
                    notIncludedList: obj[key].notIncludedList,
                    personName: obj[key].personName,
                    promoted: obj[key].promoted,
                    reviewLink: obj[key].reviewLink,
                    rightList: obj[key].rightList,
                    title: obj[key].title,
                    uid: obj[key].uid,
                    username: obj[key].username,
                    wrongList: obj[key].wrongList,
                    yourReview: obj[key].yourReview
                  })
                }
                
                commit('setLoadedRecentPosts', Posts)
          })

      },

      signUserUp ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError'),

        
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              commit('setLoading', false)
              const newUser = {
                id: user.user.uid,
                username: payload.username,
                email: payload.email,
                bio: "Welcome to ApolloX",
                monthCreated: new Date().getMonth(),
                dayCreated:  new Date().getDate(),
                yearCreated: new Date().getFullYear()
                
                
              }
    
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
       
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString())
        .once('value').then((data) => {
          
          const obj = data.val()
          const newPost ={
            title: payload.title,
            personName: payload.personName,
            reviewLink: payload.reviewLink, 
            newReview: payload.newReview,
            yourReview: payload.yourReview,
            promoted: false,
            timeStamp:-new Date().getTime(),
            wrongList: payload.wrongList,
            rightList: payload.rightList,
            notIncludedList: payload.notIncludedList,
            username: obj.username,
            uid: obj.id
          
          }
          firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString()).child('Posts').push(newPost).catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              
            })

            firebase.database().ref('Posts').push(newPost).catch(
              error => {
                commit('setLoading', false)
                commit('setError', error)
                
              })

          commit('submitPost',newPost)
          
        })
        
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

      loadedRecentPosts(state){
          console.log(state.loadedRecentPosts)
          return state.loadedRecentPosts
      },
      loadedProfile (state) {
        return state.loadedProfile  
      },
      user (state) {
        return state.user
        console.log(state)
      },
      loading (state) {
        return state.loading
      },
      error (state) {
        return state.error
      },
      userId (state) {
        return state.user.id
      },
      loadedProfileId (state) {
        return state.loadedProfile[0].id
      }
    }
  })