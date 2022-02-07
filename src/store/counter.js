import {defineStore} from 'pinia';

export const useCounterStore = defineStore('main', {
    state:()=>({
        counter: 0,
        name: "Faizi"
    }),
    getters:{
        doubleCount: (state) => {
            state.counter*2;
        },
        squaredCount: (state) => {
            state.counter*state.counter;
        }
    },
    actions:{
        reset(){
            this.counter = 0;
        },
        increment(){
            this.counter++;
        },
        decrement(){
            this.counter--;
        }
    }
})