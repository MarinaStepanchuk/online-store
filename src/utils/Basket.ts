import Database from '../database/Database';

interface IBasketItem {
  id: number;
  amount: number;
}

class Basket {
  private basket: IBasketItem[];

  constructor() {
    this.basket = localStorage.basket ? JSON.parse(localStorage.basket) : [];
  }

  // refreshBasket(): void {
  //   this.basket = JSON.parse(localStorage.basket);
  // }

  // static getBasketFromLocalStorage(): IBasketItem[] {
  //   console.log(JSON.parse(localStorage.basket));
  //   return JSON.parse(localStorage.basket);
  // }

  public basketContain(id: number) {
    return !!this.basket.find((item) => item.id === id);
  }

  public getBasketSum(): number {
    return this.basket.reduce((acc, item) => acc + +(Database.getPriceById(item.id) * item.amount).toFixed(2), 0);
  }

  public getBasketAmount(): number {
    return this.basket.reduce((acc, item) => acc + item.amount, 0);
  }
}

export default Basket;
