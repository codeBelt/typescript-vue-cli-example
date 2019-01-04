import {Module} from 'vuex';
import ISwapiState from '@/stores/swapi/models/actions/ISwapiState';
import IRootState from '@/stores/IRootState';
import CategoryEnum from '@/constants/CategoryEnum';
import {swapiModuleGetter} from '@/stores/swapi/SwapiModuleGetter';
import {swapiModuleAction} from '@/stores/swapi/SwapiModuleAction';
import {swapiModuleMutation} from '@/stores/swapi/SwapiModuleMutation';

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
    getters: swapiModuleGetter,
    mutations: swapiModuleMutation,
    actions: swapiModuleAction,
    namespaced: true,
};
