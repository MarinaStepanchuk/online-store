import ErrorPage from '../pages/ErrorPage/ErrorPage';
import RoutesType from './Router.types';
import { RoutesWithRequiredParams } from './Routes';

class RouterHash {
  static routes: RoutesType = {};

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
    const urlParts = window.location.hash.split('/');
    const url: string = urlParts[1] ? `/${urlParts[1]}` : '/';
    const param = urlParts[2];
    const rout = RouterHash.resolveRoute(url);
    if (RoutesWithRequiredParams.includes(url) && param) {
      rout(param);
    } else if (!RoutesWithRequiredParams.includes(url) && !param) {
      rout();
    } else {
      ErrorPage.render();
    }
  }

  public init(): void {
    window.addEventListener('load', RouterHash.router);
    window.addEventListener('hashchange', RouterHash.router);
  }
}

export default RouterHash;
