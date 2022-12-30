import ErrorPage from '../pages/ErrorPage/ErrorPage';
import RoutesType from './router.types';
import Routes, { RoutesWithRequiredParams } from './routes';

class Router {
  static routes: RoutesType = Routes as RoutesType;

  constructor(initRoutes: RoutesType) {
    Router.routes = initRoutes;
  }

  static resolveRoute(url: string): (param?: string) => void {
    const cb = Router.routes[url];
    if (cb) {
      return cb;
    }
    return ErrorPage.render;
  }

  static router(): void {
    const [,urlPart1, urlPart2] = window.location.pathname.split('/');
    const url = `/${urlPart1 || ''}`;
    const rout = Router.resolveRoute(url);
    if (RoutesWithRequiredParams.includes(url)) {
      rout(urlPart2);
    } else {
      rout();
    }
  }
}

export default Router;
