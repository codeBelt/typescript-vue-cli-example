import Vue from 'vue';
import Vuex from 'vuex';
import {swapiModule} from '@/stores/swapi/SwapiModule';
import IRootState from '@/stores/IRootState';

Vue.use(Vuex);

// https://egghead.io/courses/use-typescript-to-develop-vue-js-web-applications
// https://egghead.io/courses/vue-js-state-management-with-vuex-and-typescript

export default new Vuex.Store<IRootState>({
    strict: true,
    plugins: [],
    modules: {
        swapiModule,
    },
});
