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
      loadedFollowingPosts:[],
      loadedPost:[],
      searchedUsernames:[],
      searchedPosts:[],
      recentPostCount: 0,
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
      setSearchedUsernames (state, payload) {
        state.searchedUsernames = payload
        
      },
      setSearchedPosts (state, payload) {
        state.searchedPosts = payload
        
      },
      setLoadedFollowingPosts(state, payload){
        state.loadedFollowingPosts = payload
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
      },
      setLoadedPost (state, payload) {
        state.loadedPost = payload
      }
    },
    actions: {
        
      loadPost({commit}, payload){
        firebase.database().ref().child('Users').child(payload.uid).child("Posts").child(payload.postKey).once('value').then((data)=>{
          const obj = data.val()
          const post = []
          post.push({
            newReview: obj.newReview,
                        notIncludedList: obj.notIncludedList,
                        personName: obj.personName,
                        promoted: obj.promoted,
                        reviewLink: obj.reviewLink,
                        rightList: obj.rightList,
                        title: obj.title,
                        uid: obj.uid,
                        username: obj.username,
                        wrongList: obj.wrongList,
                        yourReview: obj.yourReview,
                        timeStamp: obj.timeStamp,
                        date: obj.date,
          })
          commit('setLoadedPost', post)
        })
      },

      followProfile({commit}, payload){
        console.log("profile UID", payload.profileUid)
          firebase.database().ref().child('Users').child(payload.profileUid).child("followers").child(firebase.auth().currentUser.uid.toString()).set(firebase.auth().currentUser.uid.toString())
          firebase.database().ref().child('Users').child(firebase.auth().currentUser.uid.toString()).child("following").child(payload.profileUid).set(payload.profileUid)
         },
      
      unFollowProfile({commit}, payload){
      
        firebase.database().ref().child('Users').child(payload.profileUid).child("followers").child(firebase.auth().currentUser.uid.toString()).remove()
        firebase.database().ref().child('Users').child(firebase.auth().currentUser.uid.toString()).child("following").child(payload.profileUid).remove()
      },

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
          
       
            if(profilePosts != null){
                for (let key in profilePosts){
                  console.log("key", key)
                  firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString())
                  .child('Posts').child(key).child('username').set(payload.username)
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

      loadProfile ({commit}, payload) {
        firebase.database().ref('Users').child(payload.uid)
        .once('value').then((data) => {
          var followingCount = 0
          var followerCount = 0

          const obj = data.val()
         
          if(obj.following != null){
            
          for(let keys in obj.following){
                followingCount += 1
          }
        }

        if(obj.followers != null){
            
          for(let keys in obj.followers){
                followerCount += 1
          }
        }
        
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
            following: obj.following,
            followingCount: followingCount,
            followerCount: followerCount,
            followers: obj.followers
          })
            
            commit('setLoadedProfile', profile)
        })
      },

      loadRecentPosts({commit},payload){
        
        firebase.database().ref().child("Posts").orderByChild("timestamp").limitToFirst(payload.index).on("value", function (snapshot) {
          const Posts = []
          var imageUrl = null
          snapshot.forEach(function(child) {
            
              console.log(child.val()) 
              const obj = child.val()
              
              
             
              
            
            
          

              Posts.push({
                key: child.key,
                newReview: obj.newReview,
               notIncludedList: obj.notIncludedList,
               personName: obj.personName,
                promoted: obj.promoted,
                reviewLink: obj.reviewLink,
               rightList: obj.rightList,
               title: obj.title,
               uid: obj.uid,
               username: obj.username,
                wrongList: obj.wrongList,
               yourReview: obj.yourReview,
               timestamp: obj.timestamp,
               date: obj.date,
               imageUrl: imageUrl
                         })
             

          });
          console.log(Posts)
          commit('setLoadedRecentPosts', Posts)
        })
      },


      loadProfilePosts({commit}, payload){
        firebase.database().ref('Users').child(payload.uid).child('Posts').orderByChild('timestamp').limitToFirst(payload.index).on("value", function (snapshot) {
          const Posts = []
          var imageUrl = null
          snapshot.forEach(function(child) {
            const obj = child.val()
                    var rateVotes = 0

                    var newReviewSlice = obj.newReview.slice(0,200)
                      if(obj.rateVotes != null){
                              rateVotes = obj.rateVotes
                      }
                    Posts.push({
                      key: child.key,
                      notIncludedList: obj.notIncludedList,
                      newReview:  obj.newReview,
                      newReviewSlice:newReviewSlice,
                      personName: obj.personName,
                      promoted: obj.promoted,
                      reviewLink: obj.reviewLink,
                      rightList: obj.rightList,
                      title: obj.title,
                      uid: obj.uid,
                      username:obj.username,
                      wrongList: obj.wrongList,
                      yourReview: obj.yourReview,
                      timeStamp: obj.timeStamp,
                      date: obj.date,
                      comments: obj.comments,
                      rateVotes : rateVotes,

                    })
                    
                  })
            
            
            
              commit('setLoadedProfilePosts', Posts)
        })

    },

      
      loadPromotedPosts({commit}){
        firebase.database().ref('Users').once('value').then((data)=>{
            const Posts = []
            const obj = data.val()
            for(let key in obj){
              var imageUrl= null
              var uid = obj[key].id
                if(obj[key].imageUrl != null){
                  imageUrl = obj[key].imageUrl
                }
              if(obj[key].Posts != null){
                firebase.database().ref('Users').child(uid).child('Posts').once('value').then((data)=> {
                  const obj = data.val()
                  for (let key in obj){
                    if(obj[key].promoted == true){
                    Posts.push({
                      key: key,
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
                      timeStamp: obj[key].timeStamp,
                      imageUrl: imageUrl,
                      date: obj[key].date
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

        loadFollowingPosts({commit}){

          firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString())
          .once('value').then((data) => {
            const Posts = []
            const obj = data.val()
            
            if(obj.following != null){
              
              for(let key in obj.following){
                firebase.database().ref('Users').child(key)
                .once('value').then((data) => {
                  const obj = data.val()
                  var imageUrl = null
                  if(obj.imageUrl != null){
                        imageUrl = obj.imageUrl
                  }
                  if(obj.Posts != null){
                    const profilePosts = obj.Posts
                    for (let key in profilePosts){
                      
                      Posts.push({
                        key: key,
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
                        timeStamp: profilePosts[key].timeStamp,
                        imageUrl : imageUrl,
                        date: profilePosts[key].date
                      })
                      
                    }
                    Posts.sort(function(a,b){
                      return a.timeStamp - b. timeStamp;
                    });
        
                 
                }

                })
              }
            }
           
                commit('setLoadedFollowingPosts', Posts)
          })
        },







      signUserUp ({commit}, payload) {
        commit('setLoading', true)
        commit('clearError'),

        
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
            user => {
              commit('setLoading', false)
              const time = new Date()
          var dateString = time.toLocaleDateString()
              const newUser = {
                id: user.user.uid,
                username: payload.username,
                email: payload.email,
                bio: "Welcome to ApolloX",
                date:dateString,
                
                
                
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
          const time = new Date()
          var dateString = time.toLocaleDateString()
          const obj = data.val()
          const newPost ={
            title: payload.title,
            personName: payload.personName,
            reviewLink: payload.reviewLink, 
            newReview: payload.newReview,
            yourReview: payload.yourReview,
            promoted: false,
            timestamp:-new Date().getTime(),
            date:dateString,
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
              
            }).then((snap) => {
              const key = snap.key 
              console.log("key", key)
              firebase.database().ref('Posts').child(key).set(newPost).catch(
                error => {
                  commit('setLoading', false)
                  commit('setError', error)
                  
                })
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
      searchWord({commit}, payload){
        var keyword = payload.keyword
        var Usernames = []
        var Posts = []
        firebase.database().ref('Users').once('value').then((data)=>{
          const obj = data.val()
          for(let key in obj){
            var imageUrl = null
                  if(obj[key].imageUrl != null){
                        imageUrl = obj[key].imageUrl
                        console.log(imageUrl)
                  }else{
                    imageUrl = null
                  }
            var username = obj[key].username.toLowerCase()
            if(username.includes(keyword.toLowerCase())){
                  Usernames.push({
                    username: username,
                    imageUrl: imageUrl,
                    uid: obj[key].id
                  })
            }

            const profilePosts = obj[key].Posts
            if(obj[key].Posts != null){
                  for(let key in profilePosts){
                    var title = profilePosts[key].title.toLowerCase()
                   
                    if(title.includes(keyword.toLowerCase())){
                      var newReviewSlice = profilePosts[key].newReview.slice(0,200)
                        Posts.push({
                          key: key,
                          newReview: profilePosts[key].newReview,
                          notIncludedList: profilePosts[key].notIncludedList,
                          personName:profilePosts[key].personName,
                          newReviewSlice:newReviewSlice,
                          promoted: profilePosts[key].promoted,
                          reviewLink: profilePosts[key].reviewLink,
                          rightList: profilePosts[key].rightList,
                          title: profilePosts[key].title,
                          uid: profilePosts[key].uid,
                          username: profilePosts[key].username,
                          wrongList:profilePosts[key].wrongList,
                          yourReview: profilePosts[key].yourReview,
                          timeStamp: profilePosts[key].timeStamp,
                          imageUrl: imageUrl,
                          date: profilePosts[key].date
                        })
                    }
                  }
            }


          }
          Posts.sort()
          Posts.reverse()
          Usernames.sort()
          Usernames.reverse()
          commit('setSearchedPosts', Posts)
          commit('setSearchedUsernames', Usernames)
        })

      },



      postComment({commit}, payload){
        var comment = {}
        const time = new Date()
        var dateString = time.toLocaleDateString()
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString())
        .once('value').then((data) => {
          
            var imageUrl = null
            const obj = data.val()
                  if(obj.imageUrl != null){
                        imageUrl = obj.imageUrl
                        
                  }else{
                    imageUrl = null
                  }

                  comment = {
                    uid: firebase.auth().currentUser.uid.toString(),
                    comment: payload.comment,
                    timeStamp:-new Date().getTime(),
                    date:dateString,
                    upvotes: 0,
                    imageUrl: imageUrl,
                    username: obj.username
    
            }
            
            firebase.database().ref('Users').child(payload.uid).child('Posts').child(payload.postKey).child('comments').push(comment)
            firebase.database().ref('Posts').child(payload.postKey).child('comments').push(comment)

        })
        
        
      }
      
    },
    getters: {

      loadedPost(state) {
        return state.loadedPost
      },

      loadedRecentPosts(state){
          console.log(state.loadedRecentPosts)
          return state.loadedRecentPosts
      },
      loadedFollowingPosts(state){
        
        return state.loadedFollowingPosts
    },
      loadedProfilePosts(state){
        console.log(state.loadedProfilePosts)
        return state.loadedProfilePosts
    },

      isUsernameValid(state){
                console.log("loading",state.loading)
                return state.validUsername
              
              
        
      },

      loadedSearchedUsernames(state){
        return state.searchedUsernames
      },
      loadedSearchedPosts(state){
        return state.searchedPosts
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