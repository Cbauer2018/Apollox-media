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
      profileFollowing:[],
      profileFollowers:[],
      recentPostCount: 0,
      validUsername: false,
      user: null,
      loading: false,
      error: null
    },
    mutations: {
      setValidUsername(state, payload){
        
          state.validUsername = payload
         
          

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
      },

      setLoadedProfileFollowing(state, payload){
            state.profileFollowing = payload
      },
      setLoadedProfileFollowers(state, payload){
        state.profileFollowers = payload
      },
    },
    actions: {
        ContactForm({commit}, payload){
            const topic = payload.topic
            const text = payload.text
            const email = firebase.auth().currentUser.email.toString()

            const Form ={topic: topic, text: text, email:email}

            firebase.database().ref().child("Contact Forms").push(Form)
        },
      loadPost({commit}, payload){
        firebase.database().ref().child('Users').child(payload.uid).child("Posts").child(payload.postKey).on('value', function(data){
          const obj = data.val()
          const post = []
          var voters = 0
          var totalRating = 0
          var rating = 0
          if(obj.voters != null){
           
                for(let i in obj.voters){
                  voters +=1
                 
                }
                totalRating = obj.totalRating
                rating = totalRating/voters
          }
         

          var comments = []
         for(let key in obj.comments)
          {
           comments.push(obj.comments[key]) 
          }

          comments.reverse()

          
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
                        rating:rating,
                        voters:voters,
                        voterIds : obj.voters,
                        comments: comments,
                        
          })

          commit('setLoadedPost', post)
        })
      },

      followProfile({commit}, payload){
        
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
              firebase.database().ref().child('Posts').orderByChild('uid').equalTo(firebase.auth().currentUser.uid.toString()).once("value", function (snapshot) {
              
                
                snapshot.forEach(function(child) {
                  firebase.database().ref().child('Posts').child(child.key).child('username').set(payload.username)
                  firebase.database().ref().child('Posts').child(child.key).child('imageUrl').set(url)
                })
              })

              return firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString()).child('imageUrl').set(url)
            }
            )
        })


        
      }

        firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString())
        .child('username').set(payload.username)
        firebase.database().ref().child('Posts').orderByChild('uid').equalTo(firebase.auth().currentUser.uid.toString()).once("value", function (snapshot) {
              
                
          snapshot.forEach(function(child) {
           
            firebase.database().ref().child('Posts').child(child.key).child('username').set(payload.username)
         
          })
        })

        firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString()).once('value').then((data)=>{
          const obj = data.val()
          const profilePosts = obj.Posts
          
       
            if(profilePosts != null){
                for (let key in profilePosts){
               
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
        .on('value', function(data)  {
          var followingCount = 0
          var followerCount = 0
          var totalVotes = 0
          var totalRatings = 0
          var profileRating = 0
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

        for(let keys in obj.Posts){
          if(obj.Posts[keys].voters != null){
           
            for(let i in obj.Posts[keys].voters){
              totalVotes +=1
            }
            totalRatings += obj.Posts[keys].totalRating
            
      }
        }


        profileRating = totalRatings/ totalVotes
        
        
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
            followers: obj.followers,
            profileRating: profileRating,
            totalVotes: totalVotes

          })
            
            commit('setLoadedProfile', profile)
        })
      },

      viewFollowing({commit}, payload){
        firebase.database().ref('Users').child(payload.uid)
        .once('value', function(data)  {
          const obj = data.val()
          const Profiles = []
          for(let key in obj.following){
           
            firebase.database().ref('Users').child(key)
            .once('value', function(data)  {
             const profile = data.val()
                  Profiles.push({
                        imageUrl :profile.imageUrl,
                        username: profile.username,
                        uid: key
                  })
                  
            })
          }
          
          commit('setLoadedProfileFollowing', Profiles)
        })
      },

      viewFollowers({commit}, payload){
        firebase.database().ref('Users').child(payload.uid)
        .once('value', function(data)  {
          const obj = data.val()
          const Profiles = []
          for(let key in obj.followers){
           
            firebase.database().ref('Users').child(key)
            .once('value', function(data)  {
             const profile = data.val()
                  Profiles.push({
                        imageUrl :profile.imageUrl,
                        username: profile.username,
                        uid: key
                  })
                  
            })
          }
          
          commit('setLoadedProfileFollowers', Profiles)
        })

      },



      loadRecentPosts({commit},payload){
        
        firebase.database().ref('Posts').orderByChild('timestamp').limitToFirst(payload.index).once("value", function (snapshot) {
          const Posts = []
          
          snapshot.forEach(function(child) {
          
             
              const obj = child.val()
            var imageUrl = null
             if(obj.imageUrl != null){
                  imageUrl = obj.imageUrl
             }
         
            
              var voters = 0
            
                  var totalRating = 0
                  var rating = 0
                 if(obj.voters != null){
             
                  for(let i in obj.voters){
                    voters +=1
                   
                  }
                  totalRating = obj.totalRating
                  rating = totalRating/voters
            }
            
          
            var newReviewSlice = obj.newReview.slice(0,200)
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
               imageUrl: imageUrl,
               rating:rating,
                        voters:voters,
                        voterIds : obj.voters,
                        newReviewSlice: newReviewSlice
                         })
             

          });
         
           
            commit('setLoadedRecentPosts', Posts)
          
         
        })
      },


      loadProfilePosts({commit}, payload){
        firebase.database().ref('Users').child(payload.uid).child('Posts').orderByChild('timestamp').limitToFirst(payload.index).on("value", function (snapshot) {
          const Posts = []
          var imageUrl = null
          snapshot.forEach(function(child) {
            const obj = child.val()
                
                var voters = 0
                  var totalRating = 0
                  var rating = 0
                 if(obj.voters != null){
             
                  for(let i in obj.voters){
                    voters +=1
                   
                  }
                  totalRating = obj.totalRating
                  rating = totalRating/voters
            }

                    var newReviewSlice = obj.newReview.slice(0,200)
                    
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
                      rating:rating,
                        voters:voters,
                        voterIds : obj.voters
                    })
                    
                  })
            
            
            
              commit('setLoadedProfilePosts', Posts)
        })

    },

      
      loadPromotedPosts({commit}, payload){
        
        
        firebase.database().ref().child('Posts').orderByChild('promoted').equalTo("TRUE").limitToLast(payload.index).once("value", function (snapshot) {
          var Posts = []
          var imageUrl = null
       
          snapshot.forEach(function(child) {
            
             console.log(child)
              const obj = child.val()
            
              var voters = 0
                  var totalRating = 0
                  var rating = 0
                 if(obj.voters != null){
             
                  for(let i in obj.voters){
                    voters +=1
                   
                  }
                  totalRating = obj.totalRating
                  rating = totalRating/voters
            }
            
            var imageUrl = null
            if(obj.imageUrl != null){
                 imageUrl = obj.imageUrl
            }
            var newReviewSlice = obj.newReview.slice(0,200)
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
               imageUrl: imageUrl,
               rating:rating,
                 voters:voters,
                        voterIds : obj.voters,
                        newReviewSlice :newReviewSlice
                         })
                 
             

          });

          Posts.sort(function(a,b){
            return a.timestamp - b.timestamp;
          });
          
          commit('setLoadedPromotedPosts', Posts)
        })

    },

        loadFollowingPosts({commit}, payload){

          firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString()).child('following')
          .once('value').then((data) => {
            var Posts = []
            const obj = data.val()
          
           for(let key in obj){
            firebase.database().ref().child("Posts").orderByChild('uid').equalTo(key).once("value", function (snapshot) {
              
              var imageUrl = null
              
              snapshot.forEach(function(child) {
                
                  const timestamp = child.child('timestamp').val()
                 
                  if(Posts.length  <= payload.index -1 || timestamp < Posts[payload.index -1].timestamp){
                   
                    
                   
                    const obj = child.val()
                    
                  var voters = 0
                      var totalRating = 0
                      var rating = 0
                     if(obj.voters != null){
                 
                      for(let i in obj.voters){
                        voters +=1
                       
                      }
                      totalRating = obj.totalRating
                      rating = totalRating/voters
                }
                var imageUrl = null
             if(obj.imageUrl != null){
                  imageUrl = obj.imageUrl
             }
              
                var newReviewSlice = obj.newReview.slice(0,200)
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
                   imageUrl: imageUrl,
                   rating:rating,
                     voters:voters,
                            voterIds : obj.voters,
                            newReviewSlice: newReviewSlice
                             })
                 
                             
                        Posts.sort(function(a,b){

                              return a.timestamp - b.timestamp;
                            });
                            
                        
                           
                          }
                       
                          
              });
              
              commit('setLoadedFollowingPosts', Posts.slice(0, payload.index))
    
              
            })
            
            
           }
          
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
          var imageUrl = null
          if(obj.imageUrl != null){
            imageUrl = obj.imageUrl
          }

          const newPost ={
            title: payload.title,
            personName: payload.personName,
            reviewLink: payload.reviewLink, 
            newReview: payload.newReview,
            yourReview: payload.yourReview,
            promoted: "FALSE",
            timestamp:-new Date().getTime(),
            date:dateString,
            wrongList: payload.wrongList,
            rightList: payload.rightList,
            notIncludedList: payload.notIncludedList,
            username: obj.username,
            uid: obj.id,
            imageUrl: imageUrl
          
          }
          firebase.database().ref('Users').child(firebase.auth().currentUser.uid.toString()).child('Posts').push(newPost).catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              
            }).then((snap) => {
              const key = snap.key 
              
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
        firebase.database().ref('Users').orderByChild('username').equalTo(payload.keyword).once('value').then((data)=>{
          const obj = data.val()
          for(let key in obj){
            var imageUrl = null
                  if(obj[key].imageUrl != null){
                        imageUrl = obj[key].imageUrl
                     
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

            

          }
        
          Usernames.sort()
          Usernames.reverse()
          
          commit('setSearchedUsernames', Usernames)
        })

        firebase.database().ref('Posts').orderByChild('timestamp').once('value').then((data)=>{
          const profilePosts = data.val()
          for(let key in profilePosts){
            var title = profilePosts[key].title.toLowerCase()
                   var imageUrl = null
                        if(title.includes(keyword.toLowerCase())){
                         
            var imageUrl = null
             if(profilePosts[key].imageUrl != null){
                  imageUrl = profilePosts[key].imageUrl
             }
         
            
              var voters = 0
            
                  var totalRating = 0
                  var rating = 0
                 if(profilePosts[key].voters != null){
             
                  for(let i in profilePosts[key].voters){
                    voters +=1
                   
                  }
                  totalRating = profilePosts[key].totalRating
                  rating = totalRating/voters
            }
            
          
            var newReviewSlice = profilePosts[key].newReview.slice(0,200)
              Posts.push({
                key: key,
                newReview: profilePosts[key].newReview,
               notIncludedList: profilePosts[key].notIncludedList,
               personName: profilePosts[key].personName,
                promoted: profilePosts[key].promoted,
                reviewLink: profilePosts[key].reviewLink,
               rightList:profilePosts[key].rightList,
               title: profilePosts[key].title,
               uid: profilePosts[key].uid,
               username: profilePosts[key].username,
                wrongList: profilePosts[key].wrongList,
               yourReview: profilePosts[key].yourReview,
               timestamp: profilePosts[key].timestamp,
               date: profilePosts[key].date,
               imageUrl: imageUrl,
               rating:rating,
                        voters:voters,
                        voterIds : profilePosts[key].voters,
                        newReviewSlice: newReviewSlice
                         })
             
                        }
          }
          Posts.sort()
          Posts.reverse()
          commit('setSearchedPosts', Posts.splice(0, 5))
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
        },

        ratePost({commit}, payload){
          firebase.database().ref('Users').child(payload.postUid).child('Posts').child(payload.postKey).child('totalRating').once('value').then((data)=>{
            var totalRating = data.val()

            if(totalRating == null){
              firebase.database().ref('Users').child(payload.postUid).child('Posts').child(payload.postKey).child('totalRating').set(payload.rating)
              firebase.database().ref('Users').child(payload.postUid).child('Posts').child(payload.postKey).child('voters').push(payload.uid)
              firebase.database().ref('Posts').child(payload.postKey).child('voters').push(payload.uid)
              firebase.database().ref('Posts').child(payload.postKey).child('totalRating').set(payload.rating)

            }else{
              var newRating =totalRating + payload.rating
              firebase.database().ref('Users').child(payload.postUid).child('Posts').child(payload.postKey).child('totalRating').set(newRating)
              firebase.database().ref('Users').child(payload.postUid).child('Posts').child(payload.postKey).child('voters').push(payload.uid)
              firebase.database().ref('Posts').child(payload.postKey).child('voters').push(payload.uid)
              firebase.database().ref('Posts').child(payload.postKey).child('totalRating').set(newRating)
            }
          })
          
        },

        resetPassword({commit}, payload){
          var email = firebase.auth().currentUser.email
          firebase.auth().sendPasswordResetEmail(email).then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });
        }
      
    },
    getters: {

      loadedPost(state) {
        return state.loadedPost
      },

      loadedRecentPosts(state){
         
          return state.loadedRecentPosts
      },
      loadedFollowingPosts(state){
        
        return state.loadedFollowingPosts
    },
      loadedProfilePosts(state){
        
        return state.loadedProfilePosts
    },

      isUsernameValid(state){
               
                return state.validUsername
              
              
        
      },

      loadedSearchedUsernames(state){
        return state.searchedUsernames
      },
      loadedSearchedPosts(state){
        return state.searchedPosts
      },

      loadedPromotedPosts(state){
       
        return state.loadedPromotedPosts
    },
      loadedProfile (state) {
        return state.loadedProfile  
      },
      user (state) {
        return state.user
        
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
      },
      loadedProfileFollowing(state){
          return state.profileFollowing 
      },
      loadedProfileFollowers(state){
        return state.profileFollowers
      }

    }
  })