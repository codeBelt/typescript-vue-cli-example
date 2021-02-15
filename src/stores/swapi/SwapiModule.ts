import {Module} from 'vuex';
import ISwapiState from '@/stores/swapi/models/actions/ISwapiState';
import IRootState from '@/stores/IRootState';
import CategoryEnum from '@/constants/CategoryEnum';
import {swapiModuleGetter} from '@/stores/swapi/SwapiModuleGetter';
import {swapiModuleAction} from '@/stores/swapi/SwapiModuleAction';
import {swapiModuleMutation} from '@/stores/swapi/SwapiModuleMutation';
import {namespace} from 'vuex-class';
import {BindingHelper} from 'vuex-class/lib/bindings';

export const swapiNamespace: string = 'swapiModule';
export const SwapiAction: BindingHelper = namespace(swapiNamespace).Action;
export const SwapiGetter: BindingHelper = namespace(swapiNamespace).Getter;
export const SwapiMutation: BindingHelper = namespace(swapiNamespace).Mutation;

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
