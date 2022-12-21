import './css/common.styles.scss';
import RouterHash from './Router/RouterHash';
import Routes from './Router/Routes';
import RoutesType from './Router/Router.types';

const Router = new RouterHash(Routes as RoutesType);

Router.init();
