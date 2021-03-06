import {createStore} from 'vuex';
// import axios from 'axios';

export default createStore({
    state:{
        counter: 0,
        colorCode: 'red'
    },
    mutations:{
        increaseCounter(state, randomNumber){
           state.counter += randomNumber
        },
        decreaseCounter(state, randomNumber){
            state.counter -= randomNumber
        },
        setColorCode(state, newValue){
            state.colorCode = newValue
        }
    },
    actions:{
        increaseCounter({commit}){
            commit('increaseCounter', 1)
            // axios.get('https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new')
            // .then(response => {
            //     commit('increaseCounter', response.data)
            // })
            // .catch(err => console.log(err))
        },
        decreaseCounter({commit}){
            commit('decreaseCounter', 1)
            // axios.get('https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new')
            // .then(response => {
            //     commit('decreaseCounter', response.data)
            // })
            // .catch(err => console.log(err))
        },
        setColorCode({commit}, newValue){
            commit('setColorCode', newValue)
        }
    },
    getters:{
        counterSquared(state){
            return state.counter * state.counter;
        }
    },
    modules:{}
});