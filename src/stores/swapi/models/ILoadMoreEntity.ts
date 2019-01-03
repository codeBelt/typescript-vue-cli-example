import IEntityState from '@/models/IEntityState';
import {SwapiModelUnion} from '@/stores/swapi/models/CategoryResponseModel';

export default interface ILoadMoreEntity {
    readonly totalCount: number;
    readonly loadMoreUrl: string;
    readonly entity: IEntityState<SwapiModelUnion>;
}
