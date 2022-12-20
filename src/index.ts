import './css/common.styles.scss';
import RouterHash from './router/router-hash';
import Routes from './router/routes';
import RoutesType from './router/router.types';

const Router = new RouterHash(Routes as RoutesType);

Router.init();
