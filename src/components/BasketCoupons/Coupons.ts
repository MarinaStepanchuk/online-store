import CouponsDatabase from './CouponsDatabase';
import ICoupon from './BasketCoupons.interface';

class Coupons {
  private data: ICoupon[] = CouponsDatabase;

  public activeCoupons = this.getAllActiveCoupons();

  public getAllCoupons(): ICoupon[] {
    return this.data;
  }

  public getAllActiveCoupons(): ICoupon[] {
    return localStorage.getItem('couponsHS') ? JSON.parse(localStorage.getItem('couponsHS') as string) : [];
  }

  public getCouponByValue(name: string): ICoupon {
    return this.data.find((coupon) => coupon.name === name) as ICoupon;
  }

  public removeActiveCoupon(name: string): void {
    this.activeCoupons = this.activeCoupons.filter((coupon) => coupon.name !== name);
    localStorage.setItem('couponsHS', JSON.stringify(this.activeCoupons));
  }

  public setActiveCoupon(value: string) {
    const coupon = this.getCouponByValue(value);
    this.activeCoupons.push(coupon);
    localStorage.setItem('couponsHS', JSON.stringify(this.activeCoupons));
  }

  public exists(value: string): boolean {
    return !!this.data.find((coupon) => coupon.name === value);
  }

  public isActive(value: string):boolean {
    return !!this.activeCoupons.find((coupon) => coupon.name === value);
  }

  public getStringAllCoupons(): string {
    return this.data.map((coupon: ICoupon) => coupon.name).join(', ');
  }
}

export default Coupons;
