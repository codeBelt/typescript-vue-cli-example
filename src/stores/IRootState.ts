import {Module} from 'vuex';
import ISwapiState from './swapi/models/ISwapiState';

export default interface IRootState {
    swapiModule: Module<ISwapiState, IRootState>;
}
