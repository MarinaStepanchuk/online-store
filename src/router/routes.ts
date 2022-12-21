import Goods from '../pages/MainPage/MainPage';
import Description from '../pages/ProductPage/ProductPage';
import BasketPage from '../pages/BasketPage/BasketPage';

export const RoutesWithRequiredParams = ['/description'];

const Routes = {
  '/': Goods.render,
  '/basket': BasketPage.render,
  '/description': Description.render,
};

export default Routes;
