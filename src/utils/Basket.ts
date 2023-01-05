import Database from '../database/Database';
import { IBasketProduct } from '../components/BasketProduct/BasketProduct.interface';
import getPriceAfterDiscont from './getPriceAfterDiscont';

interface IBasketItem {
  id: number;
  amount: number;
}

class Basket {
  private basketHS: IBasketItem[];

  constructor() {
    this.basketDefault();
    this.basketHS = JSON.parse(localStorage.getItem('basketHS') as string);
  }

  public getBasketList(): IBasketProduct[] {
    return this.basketHS.map((item: IBasketItem, idx: number): IBasketProduct => ({ ...Database.getProductById(item.id), index: idx + 1, amount: item.amount }));
  }

  private basketDefault(): void {
    if (!localStorage.getItem('basketHS')) {
      localStorage.setItem('basketHS', JSON.stringify([]));
    }
  }

  public basketContain(id: number): boolean {
    return !!this.basketHS.find((item) => item.id === id);
  }

  public getBasketSum(): number {
    const basketSum = this.basketHS.reduce((acc, item) => acc + this.getPriceById(item.id) * item.amount, 0);
    return +basketSum.toFixed(2);
  }

  private getPriceById(id: number): number {
    return getPriceAfterDiscont(Database.getProductById(id).price, Database.getProductById(id).discountPercentage);
  }

  public getBasketAmount(): number {
    return this.basketHS.reduce((acc, item) => acc + item.amount, 0);
  }

  public getAmountProduct(id: number): number {
    const element = this.basketHS.find((elem) => elem.id === id) as IBasketItem;
    return element.amount;
  }

  public increaseAmount(id: number): void {
    this.basketHS = this.basketHS.map((element: IBasketItem) => ({
      ...element,
      amount: element.id === id ? element.amount + 1 : element.amount,
    }));
    localStorage.basketHS = JSON.stringify(this.basketHS);
  }

  public decreaseAmount(id: number): void {
    this.basketHS = this.basketHS.map((element: IBasketItem) => ({
      ...element,
      amount: element.id === id ? element.amount - 1 : element.amount,
    }));
    localStorage.basketHS = JSON.stringify(this.basketHS);
  }

  public setProductToBasket(id: number): void {
    this.basketHS.push({
      id,
      amount: 1,
    });
    localStorage.basketHS = JSON.stringify(this.basketHS);
  }

  public removeProductFromBasket(id: number): void {
    this.basketHS = this.basketHS.filter((item) => item.id !== id);
    localStorage.basketHS = JSON.stringify(this.basketHS);
  }
}

export default Basket;
