import {Module} from 'vuex';
import ISwapiState from '@/stores/swapi/models/ISwapiState';
import IRootState from '@/stores/IRootState';
import CategoryEnum from '@/constants/CategoryEnum';
import {swapiGetterModule} from '@/stores/swapi/SwapiGetterModule';
import {swapiActionModule} from '@/stores/swapi/SwapiActionModule';
import {swapiMutationModule} from '@/stores/swapi/SwapiMutationModule';

export const swapiModule: Module<ISwapiState, IRootState> = {
    state: {
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
    },
    getters: swapiGetterModule,
    mutations: swapiMutationModule,
    actions: swapiActionModule,
    namespaced: true,
};
