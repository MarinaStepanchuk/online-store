import ErrorPage from '../pages/ErrorPage/ErrorPage';
import RoutesType from './router.types';
import Routes, { RoutesWithRequiredParams } from './routes';

class RouterHash {
  static routes: RoutesType = Routes as RoutesType;

  constructor(initRoutes: RoutesType) {
    RouterHash.routes = initRoutes;
  }

  static resolveRoute(url: string): (param?: string) => void {
    const cb = RouterHash.routes[url];
    if (cb) {
      return cb;
    }
    return ErrorPage.render;
  }

  static router(): void {
    const [,urlPart1, urlPart2] = window.location.pathname.split('/');
    const url: string = urlPart1 ? `/${urlPart1}` : '/';
    const param = urlPart2;
    const rout = RouterHash.resolveRoute(url);
    if (RoutesWithRequiredParams.includes(url)) {
      rout(param);
    } else {
      rout();
    }
  }
}

export default RouterHash;
