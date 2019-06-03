import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
     
      loadedProfile: [],
      loadedRecentPosts:[],
      loadedProfilePosts:[],
      loadedPromotedPosts:[],
      validUsername: false,
      user: null,
      loading: false,
      error: null
    },
    mutations: {
      setValidUsername(state, payload){
        
          state.validUsername = payload
          console.log("done")
          

      },
      setLoadedProfilePosts(state, payload){
        state.loadedProfilePosts = payload
      },
      setLoadedRecentPosts(state, payload){
        state.loadedRecentPosts = payload
      },
      setLoadedPromotedPosts(state, payload){
        state.loadedPromotedPosts = payload
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

      changeProfile ({commit}, payload) {

        if(payload.fileName != null){
        const filename = payload.fileName.name
        const ext = filename.slice(filename.lastIndexOf('.'))
       firebase.storage().ref('profiles/'+ firebase.auth().currentUser.uid.toString() + ext).put(payload.fileName)
        .then((fileData) => {
           
           firebase.storage().ref().child('profiles/'+ firebase.auth().currentUser.uid.toString() + ext).getDownloadURL().then(url =>
            {
              console.log(url)
              return firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString()).child('imageUrl').set(url)
            }
            )
        })
      }

        firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString())
        .child('username').set(payload.username)

        firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString()).once('value').then((data)=>{
          const obj = data.val()
          const profilePosts = obj.Posts
          const username = obj.username
       
            if(obj.Posts != null){
                for (let key in profilePosts){
                    profilePosts[key].username.set(username)
                }
              }
            })
        

        firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString())
        .child('bio').set(payload.bio)

      },
      
      checkUsername({commit},payload){
        commit('setLoading', true)
        firebase.database().ref('Users').once('value').then((data)=>{
            const obj = data.val()
            var isValid = true
            for(let key in obj){
              if(obj[key].username == payload.username){
                isValid = false
                break;
              }else{
                isValid = true
              }
            
            }
            commit('setValidUsername', isValid)
            
            commit('setLoading', false)
        })
      },

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
            imageUrl: obj.imageUrl,
            bio: obj.bio,
          })
            
            commit('setLoadedProfile', profile)
        })
      },

      loadRecentPosts({commit}){
          firebase.database().ref('Users').once('value').then((data)=>{
              const Posts = []
              const obj = data.val()
              for(let key in obj){
                var uid = obj[key].id

                if(obj[key].Posts != null){
                  firebase.database().ref('Users').child(uid).child('Posts').once('value').then((data)=> {
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
                        yourReview: obj[key].yourReview,
                        timeStamp: obj[key].timeStamp
                      })
                    }
                    Posts.sort(function(a,b){
                      return a.timeStamp - b. timeStamp;
                    });
        
                  })
                }
              }
              
              
                commit('setLoadedRecentPosts', Posts)
          })

      },


      loadProfilePosts({commit}){
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString()).once('value').then((data)=>{
            const Posts = []
            const obj = data.val()
            console.log("Profile Posts", obj.Posts)
            const profilePosts = obj.Posts
         
              if(obj.Posts != null){
                  for (let key in profilePosts){
                      
                    Posts.push({
                      notIncludedList: profilePosts[key].notIncludedList,
                      newReview:  profilePosts[key].newReview,
                      personName: profilePosts[key].personName,
                      promoted: profilePosts[key].promoted,
                      reviewLink: profilePosts[key].reviewLink,
                      rightList: profilePosts[key].rightList,
                      title: profilePosts[key].title,
                      uid: profilePosts[key].uid,
                      username:profilePosts[key].username,
                      wrongList: profilePosts[key].wrongList,
                      yourReview: profilePosts[key].yourReview,
                      timeStamp: profilePosts[key].timeStamp
                    })
                    
                  }
                  Posts.sort(function(a,b){
                    return a.timeStamp - b. timeStamp;
                  });
      
               
              }
            
            
            
              commit('setLoadedProfilePosts', Posts)
        })

    },

      
      loadPromotedPosts({commit}){
        firebase.database().ref('Users').once('value').then((data)=>{
            const Posts = []
            const obj = data.val()
            for(let key in obj){
              var uid = obj[key].id

              if(obj[key].Posts != null){
                firebase.database().ref('Users').child(uid).child('Posts').once('value').then((data)=> {
                  const obj = data.val()
                  for (let key in obj){
                    if(obj[key].promoted == true){
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
                      yourReview: obj[key].yourReview,
                      timeStamp: obj[key].timeStamp
                    })
                  }
                  }
                  Posts.sort(function(a,b){
                    return a.timeStamp - b. timeStamp;
                  });
      
                })
              }
            }
            
            
              commit('setLoadedPromotedPosts', Posts)
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


          commit('submitPost',newPost)
          
        })
        
      },

      signUserIn ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        var commited = false
        if(payload.loginName.toString().indexOf('@') > -1){
          commited = true
          firebase.auth().signInWithEmailAndPassword(payload.loginName, payload.password)
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
        }else{
          firebase.database().ref('Users').once('value').then((data)=>{
            const obj = data.val()
            for(let key in obj){
              if(obj[key].username == payload.loginName){
                commited = true
                firebase.auth().signInWithEmailAndPassword(obj[key].email, payload.password)
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
              }
            }
            if(!commited){
              var error = {message: "Unkown/Incorrect Username"}
              commit('setError', error)
              commit('setLoading', false)
            }

          }).catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              
            }
            
          )
        }
        
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
      loadedProfilePosts(state){
        console.log(state.loadedProfilePosts)
        return state.loadedProfilePosts
    },

      isUsernameValid(state){
                console.log("loading",state.loading)
                return state.validUsername
              
              
        
      },

      loadedPromotedPosts(state){
        console.log(state.loadedPromotedPosts)
        return state.loadedPromotedPosts
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