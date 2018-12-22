import Vue from'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedHangouts: [
            {
                imageUrl: 'https://goo.gl/h28jmE', 
                id: 'afajfjadfaadfa323', 
                title: 'Talkeetna Mountains',
                date: '2019-01-17',
                location: 'bob',
                description: 'going to be a killer time'
            },
            {
                imageUrl: 'https://goo.gl/cUVjvv', 
                id: 'aadsfhbkhlk1241', 
                title: 'Canary islands',
                date: '2019-01-19'
            }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations:{
        setLoadedHangouts (state,payload){
            state.loadedHangouts = payload
        },
        createHangout (state,payload) {
            state.loadedHangouts.push(payload)
        },
        setUser (state, payload){
            state.user = payload
        },
        setLoading (state,payload) {
            state.loading = payload
        },
        setError (state, payload){
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        loadHangouts ({commit}) {
            commit('setLoading', true)           
            firebase.database().ref('hangouts').once('value')
            .then((data) => {
                const hangouts = []
                const obj = data.val()
                for (let key in obj){
                    hangouts.push({
                        id: key,
                        title: obj[key].title,
                        location: obj[key].location,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        date: obj[key].date,
                        time: obj[key].time,
                        creatorId: obj[key].createrID

                    })
                }
                commit('setLoadedHangouts', hangouts)
                commit('setLoading', false)
            })
            .catch(
                (error)=> { 
                    console.log(error)
                    commit('setLoading', false)
                }
            )
        },
        createHangout ({commit, getters}, payload) {
            const hangout = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date,
                time: payload.time,
                createrID: getters.user.id
            }
            var key, imageUrl
            firebase.database().ref('hangouts').push(hangout)
            .then((data) => {
                const key = data.key
                // commit('createHangout', {
                //     ...hangout,
                //     id: key
                // })
                return key
            })
            .then (key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                this.key = key;
                return firebase.storage().ref('hangouts/' + key + '.' + ext).put(payload.image)
              })              
            
              .then(fileData => {
                return fileData.ref.getDownloadURL()
              }).then((imageUrl) => {
                console.log(imageUrl)
                this.imageUrl = imageUrl;
                return firebase.database().ref('hangouts').child(key).update({imageUrl: imageUrl})
              })

              .then(() => {
                commit('createHangout', {
                  ...hangout,
                  imageUrl: imageUrl,
                  id: key
                })
            
            })
            .catch((error) => {
                console.log(error)
            })
            // reach out to firebase and store it
            commit('createHangout', hangout)
        },
        signUserUp({commit} , payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.user.uid,
                            registeredHangouts: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch (
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                        
                    }
                )
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', false)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.user.uid,
                        registeredHangouts:[]
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                }
            )     
        },
        clearError ({commit}) {
            commit('clearError')
        },
        autoSignIn ({commit}, payload) {
            commit ('setUser', {id: payload.uid, registeredHangouts:[]})
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit ('setUser', null)
        }
    },
    getters: {
        loadedHangouts (state) {
            return state.loadedHangouts.sort((hangoutA, hangoutB) => {
                return hangoutA.date > hangoutB.date
            })
        },
        featuredHangouts (state, getters) {
            return getters.loadedHangouts.slice(0, 5)
        },
        loadedHangout (state) {
            return (hangoutID) => {
                return state.loadedHangouts.find((hangout) => {
                    return hangout.id === hangoutID
                })                    
            }
        },
        user (state) {
            return state.user
        },
        error (state) {
            return state.error
        },
        loading (state) {
            return state.loading
        }
    }
})