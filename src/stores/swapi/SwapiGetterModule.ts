import {GetterTree} from 'vuex';
import {namespace} from 'vuex-class';
import ISwapiState from '@/stores/swapi/models/actions/ISwapiState';
import CategoryEnum from '@/constants/CategoryEnum';
import StringUtility from '@/utilities/StringUtility';
import IRootState from '@/stores/IRootState';
import ICategoryMenu from '@/stores/swapi/models/getters/ICategoryMenu';

export const SwapiGetter = namespace('swapiModule').Getter;

export enum SwapiGetterEnum {
    categories = 'categories',
    currentCategory = 'currentCategory',
    menuItems = 'menuItems',
}

export const swapiGetterModule: GetterTree<ISwapiState, IRootState> = {
    [SwapiGetterEnum.categories]: (state, getters, rootState) => state.categories,
    [SwapiGetterEnum.currentCategory]: (state, getters, rootState) => state.currentCategory,
    [SwapiGetterEnum.menuItems]: (state, getters, rootState): ICategoryMenu[] => {
        if (state.categories === null) {
            return [];
        }

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
