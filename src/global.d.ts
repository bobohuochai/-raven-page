import Vue from 'vue'
declare module 'vue/types/vue' {
    interface Vue {
        setState: (newState: any, callback?: (...args: any) => any) => void,
        _attrs: any
    }
}