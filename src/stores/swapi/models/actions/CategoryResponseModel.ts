import {BaseModel} from 'sjs-base-model';
import FilmModel from '@/stores/swapi/models/actions/FilmModel';
import VehicleModel from '@/stores/swapi/models/actions/VehicleModel';
import CategoryEnum from '@/constants/CategoryEnum';
import IConstructor from '@/models/IConstructor';
import StarshipModel from '@/stores/swapi/models/actions/StarshipModel';
import PlanetModel from '@/stores/swapi/models/actions/PlanetModel';
import SpeciesModel from '@/stores/swapi/models/actions/SpeciesModel';
import PersonModel from '@/stores/swapi/models/actions/PersonModel';

export type SwapiModelUnion = FilmModel | PersonModel | PlanetModel | SpeciesModel | StarshipModel | VehicleModel;

/*
    // Returned Api Data Sample
    {
      "count": 87,
      "next": "https://swapi.co/api/people/?page=2",
      "previous": null,
      "results": []
    }
 */
export default class CategoryResponseModel<T> extends BaseModel {
    public readonly count: number = null;
    public readonly next: string = '';
    public readonly previous: string = '';
    public readonly results: SwapiModelUnion[] = [];

    /*
     * Client-Side properties
     */
    public category: CategoryEnum = null;

    constructor(data: Partial<CategoryResponseModel<T>>, Model: IConstructor<T>, category: CategoryEnum) {
        super();

        this.results = [Model as any];
        this.category = category;

        this.update(data);
    }

    public update(data: Partial<CategoryResponseModel<T>>): void {
        super.update(data);
    }
}
