import HttpUtility from '@/utilities/HttpUtility';
import {AxiosResponse} from 'axios';
import ICategoriesResponse from '@/stores/swapi/models/actions/ICategoriesResponse';
import CategoryResponseModel, {SwapiModelUnion} from '@/stores/swapi/models/actions/CategoryResponseModel';
import IConstructor from '@/models/IConstructor';
import SwapiUtility from '@/utilities/SwapiUtility';
import CategoryEnum from '@/constants/CategoryEnum';
import environment from 'environment';
import IDetailsRequest from '@/stores/swapi/models/actions/IDetailsRequest';
console.log(`environment`, environment);
export default class SwapiService {
    private static _http: HttpUtility = new HttpUtility();

    public static async loadCategories(): Promise<ICategoriesResponse> {
        const endpoint: string = environment.api.categories;
        const response: AxiosResponse = await SwapiService._http.cacheGet(endpoint);

        return response.data;
    }

    public static async loadCategory(endpoint: string, category: CategoryEnum): Promise<CategoryResponseModel<SwapiModelUnion>> {
        const response: AxiosResponse = await SwapiService._http.cacheGet(endpoint);

        const Model: IConstructor<SwapiModelUnion> = SwapiUtility.getModelForCreation(category);

        return new CategoryResponseModel(response.data, Model, category);
    }

    public static async loadDetails(detailsInfo: IDetailsRequest): Promise<SwapiModelUnion> {
        const endpoint: string = `${environment.api[detailsInfo.category]}${detailsInfo.itemId}/`;
        const response: AxiosResponse = await SwapiService._http.cacheGet(endpoint);

        const Model: IConstructor<SwapiModelUnion> = SwapiUtility.getModelForCreation(detailsInfo.category);

        return new Model(response.data);
    }
}
