import {MutationTree} from 'vuex';
import {namespace} from 'vuex-class';
import ISwapiState from '@/stores/swapi/models/ISwapiState';
import ICategoriesResponse from '@/stores/swapi/models/ICategoriesResponse';
import ICategoryRequest from '@/stores/swapi/models/ICategoryRequest';
import CategoryResponseModel, {SwapiModelUnion} from '@/stores/swapi/models/CategoryResponseModel';
import IEntityState from '@/models/IEntityState';
import get from 'lodash/get';
import EntityUtility from '@/utilities/EntityUtility';

export const SwapiMutation = namespace('swapiModule').Mutation;

export enum SwapiMutationEnum {
    loadCategoriesSuccess = 'loadCategoriesSuccess',
    loadCategory = 'loadCategory',
    loadCategorySuccess = 'loadCategorySuccess',
}

export const swapiMutationModule: MutationTree<ISwapiState> = {
    [SwapiMutationEnum.loadCategoriesSuccess](state: ISwapiState, payload: ICategoriesResponse) {
        state.categories = payload;
    },
    [SwapiMutationEnum.loadCategory](state: ISwapiState, payload: ICategoryRequest) {
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
