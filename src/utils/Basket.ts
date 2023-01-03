import Database from '../database/Database';

interface IBasketItem {
  id: number;
  amount: number;
}

class Basket {
  private basket: IBasketItem[];

  constructor() {
    this.basketDefolt();
    this.basket = JSON.parse(localStorage.getItem('basket') as string);
  }

  private basketDefolt() {
    if (!localStorage.getItem('basket')) {
      localStorage.setItem('basket', JSON.stringify([]));
    }
  }

  public basketContain(id: number) {
    return !!this.basket.find((item) => item.id === id);
  }

  public getBasketSum(): number {
    return +(this.basket.reduce((acc, item) => acc + Database.getPriceById(item.id) * item.amount, 0)).toFixed(2);
  }

  public getBasketAmount(): number {
    return this.basket.reduce((acc, item) => acc + item.amount, 0);
  }

  public setProductToBasket(id: number) {
    this.basket.push({
      id,
      amount: 1,
    });
    localStorage.basket = JSON.stringify(this.basket);
  }

  public removeProductFromBasket(id: number) {
    this.basket = this.basket.filter((item) => item.id !== id);
    localStorage.basket = JSON.stringify(this.basket);
  }
}

export default Basket;
