import {GetterTree} from 'vuex';
import ISwapiState from '@/stores/swapi/models/actions/ISwapiState';
import CategoryEnum from '@/constants/CategoryEnum';
import StringUtility from '@/utilities/StringUtility';
import IRootState from '@/stores/IRootState';
import ICategoryMenu from '@/stores/swapi/models/getters/ICategoryMenu';
import ICategoryDisplayItem from '@/stores/swapi/models/getters/ICategoryDisplayItem';
import ILoadMoreEntity from '@/stores/swapi/models/actions/ILoadMoreEntity';
import {SwapiModelUnion} from '@/stores/swapi/models/actions/CategoryResponseModel';
import ICategoryViewData from '@/stores/swapi/models/getters/ICategoryViewData';

export enum SwapiGetterEnum {
    categories = 'categories',
    currentCategory = 'currentCategory',
    menuItems = 'menuItems',
    categoryViewData = 'categoryViewData',
    isLoadingCategory = 'isLoadingCategory',
}

export const swapiModuleGetter: GetterTree<ISwapiState, IRootState> = {
    [SwapiGetterEnum.categories]: (state, getters, rootState) => state.categories,
    [SwapiGetterEnum.currentCategory]: (state, getters, rootState) => state.currentCategory,
    [SwapiGetterEnum.isLoadingCategory]: (state, getters, rootState) => state.isLoadingCategory,

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

    [SwapiGetterEnum.categoryViewData]: (state, getters, rootState): ICategoryViewData => {
        const model: ILoadMoreEntity = state[state.currentCategory];

        if (!model) {
            return null;
        }

        return {
            displayCount: `${model.entity.length} / ${model.totalCount}`,
            loadMoreUrl: model.loadMoreUrl,
            category: state.currentCategory,
            items: model.entity.ids.map(
                (id: string | number): ICategoryDisplayItem => {
                    const item: SwapiModelUnion = model.entity.entities[id];

                    return {
                        id: item.id,
                        label: item.name,
                        category: item.category,
                        imageUrl: item.imageUrl,
                    };
                }
            ),
        };
    },
};
