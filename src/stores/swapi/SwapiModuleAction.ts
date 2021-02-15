import {ActionTree, ActionContext} from 'vuex';
import ISwapiState from '@/stores/swapi/models/actions/ISwapiState';
import IRootState from '@/stores/IRootState';
import ICategoriesResponse from '@/stores/swapi/models/actions/ICategoriesResponse';
import SwapiService from '@/stores/swapi/SwapiService';
import ICategoryRequest from '@/stores/swapi/models/actions/ICategoryRequest';
import CategoryResponseModel, {SwapiModelUnion} from '@/stores/swapi/models/actions/CategoryResponseModel';
import {SwapiMutationEnum} from '@/stores/swapi/SwapiModuleMutation';

export enum SwapiActionEnum {
    loadCategories = 'loadCategories',
    loadCategory = 'loadCategory',
}

export const swapiModuleAction: ActionTree<ISwapiState, IRootState> = {
    async [SwapiActionEnum.loadCategories](context: ActionContext<ISwapiState, IRootState>, payload: void) {
        try {
            const responseModel: ICategoriesResponse = await SwapiService.loadCategories();

            context.commit(SwapiMutationEnum.loadCategoriesSuccess, responseModel);
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
