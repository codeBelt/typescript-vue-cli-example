import Vue from 'vue';
import Vuex, {ActionContext} from 'vuex';
import ICategoriesResponse from '@/stores/swapi/models/ICategoriesResponse';
import SwapiService from '@/stores/swapi/SwapiService';

Vue.use(Vuex);

// https://egghead.io/courses/use-typescript-to-develop-vue-js-web-applications
// https://egghead.io/courses/vue-js-state-management-with-vuex-and-typescript

export default new Vuex.Store({
    strict: true,
    plugins: [],
    modules: {},
    state: {
        myProperty: 69,
        categories: null,
    },
    getters: {
        getMyProperty: (state) => {
            return state.myProperty;
        },
    },
    mutations: {
        setMyProperty: (state, payload) => {
            console.log(`setMyProperty state`, state);
            console.log(`setMyProperty payload`, payload);
            state.my_property = payload;
        },
        setCategories: (state, payload) => {
            state.categories = payload;
        },
    },
    actions: {
        doChangeMyProperty: (context, payload) => {
            context.commit('setMyProperty', payload);
        },

        doAsyncChangeMyProperty: (context: ActionContext<any, any>, payload: any) => {
            context.commit('setMyProperty', payload);

            // try {
            //     const responseModel: ICategoriesResponse = await SwapiService.loadCategories();
            //
            //     context.commit('setCategories', responseModel);
            //     // context.commit(SwapiAction.loadCategoriesSuccess(responseModel));
            // } catch (error) {
            // }
        },
    },
});
