import {Module} from 'vuex';
import ISwapiState from '@/stores/swapi/models/actions/ISwapiState';

export default interface IRootState {
    swapiModule: Module<ISwapiState, IRootState>;
}
