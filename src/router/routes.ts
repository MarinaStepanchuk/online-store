import Goods from '../pages/Goods/Goods';
import Description from '../pages/Description/Description';
import Basket from '../pages/Basket/Basket';

export const RoutesWithRequiredParams = ['/description'];

const Routes = {
  '/': Goods.render,
  '/basket': Basket.render,
  '/description': Description.render,
};

export default Routes;
