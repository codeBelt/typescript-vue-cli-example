import {GetterTree, MutationTree, ActionTree, Module, ActionContext} from 'vuex';
import {namespace} from 'vuex-class';
import ISwapiState from '@/stores/swapi/models/ISwapiState';
import CategoryEnum from '@/constants/CategoryEnum';
import IRootState from '@/stores/IRootState';
import ICategoriesResponse from '@/stores/swapi/models/ICategoriesResponse';
import SwapiService from '@/stores/swapi/SwapiService';

// Store
// export interface RootState {
//     count: number
//     todos: TodoState
//     login: LoginState
//     history: HistoryState
// }
//
// import { MutationPayload } from 'vuex'
// export interface HistoryState {
//     history: MutationPayload[]
// }
//
// export interface PluginOptions {
//     persist?: boolean
// }

export enum SwapiEnum {
    LoadCategories = 'loadCategories',
}

const swapiState: ISwapiState = {
    currentCategory: null,
    isLoadingCategories: false,
    isLoadingCategory: false,
    isLoadingDetails: false,
    categories: null,
    [CategoryEnum.People]: null,
    [CategoryEnum.Planets]: null,
    [CategoryEnum.Starships]: null,
    [CategoryEnum.Vehicles]: null,
    [CategoryEnum.Species]: null,
    [CategoryEnum.Films]: null,
};

const swapiGetters: GetterTree<ISwapiState, IRootState> = {
    categories: (state, getters, rootState) => state.categories,
};

const swapiMutations: MutationTree<ISwapiState> = {
    loadCategoriesSuccess(state: ISwapiState, payload: ICategoriesResponse) {
        state.categories = payload;
    },
};

const swapiActions: ActionTree<ISwapiState, IRootState> = {
    async [SwapiEnum.LoadCategories](context: ActionContext<ISwapiState, IRootState>, payload: void) {
        try {
            const responseModel: ICategoriesResponse = await SwapiService.loadCategories();

            context.commit('loadCategoriesSuccess', responseModel);
            // context.commit(SwapiAction.loadCategoriesSuccess(responseModel));
        } catch (error) {
            console.log(`error`, error);
        }
    },
};

export const swapiModule: Module<ISwapiState, IRootState> = {
    state: swapiState,
    getters: swapiGetters,
    mutations: swapiMutations,
    actions: swapiActions,
    namespaced: true,
};

export const SwapiGetter = namespace('swapiModule').Getter;
export const SwapiMutation = namespace('swapiModule').Mutation;
export const SwapiAction = namespace('swapiModule').Action;
