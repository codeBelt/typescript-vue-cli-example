import CategoryEnum from '@/constants/CategoryEnum';
import ILoadMoreEntity from '@/stores/swapi/models/actions/ILoadMoreEntity';
import ICategoriesResponse from '@/stores/swapi/models/actions/ICategoriesResponse';

export default interface ISwapiState {
    [CategoryEnum.People]: ILoadMoreEntity;
    [CategoryEnum.Planets]: ILoadMoreEntity;
    [CategoryEnum.Starships]: ILoadMoreEntity;
    [CategoryEnum.Vehicles]: ILoadMoreEntity;
    [CategoryEnum.Species]: ILoadMoreEntity;
    [CategoryEnum.Films]: ILoadMoreEntity;
    currentCategory: CategoryEnum;
    isLoadingCategories: boolean;
    isLoadingCategory: boolean;
    isLoadingDetails: boolean;
    categories: ICategoriesResponse | null;
}
