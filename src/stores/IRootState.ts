import {Module} from 'vuex';
import ISwapiState from '@/stores/swapi/models/ISwapiState';

export default interface IRootState {
    swapiModule: Module<ISwapiState, IRootState>;
}
