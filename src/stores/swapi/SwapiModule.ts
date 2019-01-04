import {GetterTree, MutationTree, ActionTree, Module, ActionContext} from 'vuex';
import {namespace} from 'vuex-class';
import ISwapiState from '@/stores/swapi/models/ISwapiState';
import CategoryEnum from '@/constants/CategoryEnum';
import IRootState from '@/stores/IRootState';
import ICategoriesResponse from '@/stores/swapi/models/ICategoriesResponse';
import SwapiService from '@/stores/swapi/SwapiService';
import StringUtility from '@/utilities/StringUtility';
import ICategoryMenu from '@/stores/swapi/models/home/ICategoryMenu';
import ICategoryRequest from '@/stores/swapi/models/ICategoryRequest';
import CategoryResponseModel, {SwapiModelUnion} from '@/stores/swapi/models/CategoryResponseModel';
import IEntityState from '@/models/IEntityState';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import EntityUtility from '@/utilities/EntityUtility';

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

export enum SwapiActionEnum {
    loadCategories = 'loadCategories',
    loadCategory = 'setCurrentCategory',
}
export enum SwapiGetterEnum {
    categories = 'categories',
    currentCategory = 'currentCategory',
    menuItems = 'menuItems',
}
export enum SwapiMutationEnum {
    loadCategoriesSuccess = 'loadCategoriesSuccess',
    loadCategory = 'loadCategory',
    loadCategorySuccess = 'loadCategorySuccess',
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
    [SwapiGetterEnum.categories]: (state, getters, rootState) => state.categories,
    [SwapiGetterEnum.currentCategory]: (state, getters, rootState) => state.currentCategory,
    [SwapiGetterEnum.menuItems]: (state, getters, rootState): ICategoryMenu[] => {
        if (state.categories === null) {
            return [];
        }
        console.log(`state`, state);
        return Object.keys(state.categories).map((key: string) => {
            return {
                isActive: key === state.currentCategory,
                label: StringUtility.toTitleCase(key),
                category: key as CategoryEnum,
                apiEndpoint: state.categories[key],
            };
        });
    },
};

const swapiMutations: MutationTree<ISwapiState> = {
    [SwapiMutationEnum.loadCategoriesSuccess](state: ISwapiState, payload: ICategoriesResponse) {
        state.categories = payload;
    },
    [SwapiMutationEnum.loadCategory](state: ISwapiState, payload: ICategoryRequest) {
        console.log(`payload`, payload);
        state.currentCategory = payload.category;
        state.isLoadingCategory = true;
    },
    [SwapiMutationEnum.loadCategorySuccess](state: ISwapiState, payload: CategoryResponseModel<SwapiModelUnion>) {
        const model = payload;
        const currentEntity: IEntityState<SwapiModelUnion> = get(state[model.category], 'entity', null);
        const entity: IEntityState<SwapiModelUnion> = EntityUtility.add(model.results, 'id', currentEntity);

        state.isLoadingCategory = false;
        state[model.category] = {
            totalCount: model.count,
            loadMoreUrl: model.next,
            entity,
        };
    },
};

const swapiActions: ActionTree<ISwapiState, IRootState> = {
    async [SwapiActionEnum.loadCategories](context: ActionContext<ISwapiState, IRootState>, payload: void) {
        try {
            const responseModel: ICategoriesResponse = await SwapiService.loadCategories();

            context.commit(SwapiMutationEnum.loadCategoriesSuccess, responseModel);
            // context.commit(SwapiAction.loadCategoriesSuccess(responseModel));
        } catch (error) {
            console.log(`error`, error);
        }
    },
    async [SwapiActionEnum.loadCategory](context: ActionContext<ISwapiState, IRootState>, payload: ICategoryRequest) {
        const {category, apiEndpoint} = payload;

        context.commit(SwapiMutationEnum.loadCategory, payload);

        try {
            const responseModel: CategoryResponseModel<SwapiModelUnion> = await SwapiService.loadCategory(apiEndpoint, category);

            context.commit(SwapiMutationEnum.loadCategorySuccess, responseModel);
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
