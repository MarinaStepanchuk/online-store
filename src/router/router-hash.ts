import Error404 from '../pages/Error404/Error404';
import RoutesType from './router.types';
import { RoutesWithRequiredParams } from './routes';

class RouterHash {
  static routes: RoutesType = {};

  constructor(initRoutes: RoutesType) {
    RouterHash.routes = initRoutes;
  }

  public addRoute(path: string, cb: () => void): void {
    RouterHash.routes[path] = cb;
  }

  public deleteRoute(path: string): void {
    delete RouterHash.routes[path];
  }

  static resolveRoute(url: string): (param?: string) => void {
    const cb = RouterHash.routes[url];
    if (cb) {
      return cb;
    }
    return Error404.render;
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
      Error404.render();
    }
  }

  public init(): void {
    window.addEventListener('load', RouterHash.router);
    window.addEventListener('hashchange', RouterHash.router);
  }
}

export default RouterHash;
