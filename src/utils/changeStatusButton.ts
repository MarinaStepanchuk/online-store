import Basket from './Basket';
import { Button } from '../common.types/enums';

const changeStatusButton = (element: HTMLElement, id: number): void => {
  const button = element as HTMLElement;
  const basket = new Basket();
  if (basket.basketContain(id)) {
    button.innerHTML = `${Button.ADD}`;
    basket.removeProductFromBasket(id);
  } else {
    button.innerHTML = `${Button.REMOVE}`;
    basket.setProductToBasket(id);
  }
};

export default changeStatusButton;
