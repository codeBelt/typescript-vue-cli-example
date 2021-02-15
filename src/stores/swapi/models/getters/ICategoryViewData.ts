import CategoryEnum from '@/constants/CategoryEnum';
import ICategoryDisplayItem from '@/stores/swapi/models/getters/ICategoryDisplayItem';

export default interface ICategoryViewData {
    readonly displayCount: string;
    readonly loadMoreUrl: string;
    readonly category: CategoryEnum;
    readonly items: ICategoryDisplayItem[];
}
