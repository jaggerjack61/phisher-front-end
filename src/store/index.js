import {createStore} from 'vuex'

export default createStore({
    state: {
        daily: null,
        path: '',
    },
    getters: {},
    mutations: {
        setDaily(state, daily) {
            state.daily = daily;
        },
        setPath(state, path) {
            state.path = path;
        },
    },
    actions: {},
    modules: {}
})
