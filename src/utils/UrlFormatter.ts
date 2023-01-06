import { IPageParams } from '../database/DataBase.interfaces';

export enum QueryNames {
  CATEGORY = 'category',
  BRAND = 'brand',
  PRICE = 'price',
  STOCK = 'stock',
  MODE = 'mode',
  SORT = 'sort',
  SEARCH = 'search',
}

const VALUE_SEPARATOR = '↕';

class UrlFormatter {
  private url: URL;

  private objQueryParams: IPageParams = {};

  constructor() {
    this.url = new URL(location.href);
  }

  readAllQueryParams(): void {
    this.url = new URL(location.href);

    const temp: Record<string, string> = {};

    [...this.url.searchParams].forEach(([name, values]) => {
      temp[name] = values;
    });

    this.objQueryParams.category = new Set(temp.category?.split(VALUE_SEPARATOR));
    this.objQueryParams.brand = new Set(temp.brand?.split(VALUE_SEPARATOR));
    this.objQueryParams.search = temp.search?.toLowerCase() || '';

    if (temp.price) {
      const [minPrice, maxPrice] = temp.price.split(VALUE_SEPARATOR);
      this.objQueryParams.price = [+minPrice, +maxPrice];
    }

    if (temp.stock) {
      const [minStock, maxStock] = temp.stock.split(VALUE_SEPARATOR);
      this.objQueryParams.stock = [+minStock, +maxStock];
    }

    this.objQueryParams.mode = temp.mode || '';
    this.objQueryParams.sort = temp.sort || '';
  }

  getAllQueryParams(): IPageParams {
    this.readAllQueryParams();
    return this.objQueryParams;
  }

  setFiltersQueryParam(name: string, value: string): void {
    if (!this.url.searchParams.has(name)) {
      this.url.searchParams.append(name, value);
      return;
    }

    const stringParamValue = this.url.searchParams.get(name) as string;
    const convertValues = new Set(stringParamValue.split(VALUE_SEPARATOR)) as Set<string>;

    if (convertValues.has(value)) {
      convertValues.delete(value);
    } else {
      convertValues.add(value);
    }

    if (convertValues.size === 0) {
      this.url.searchParams.delete(name);
    } else {
      this.url.searchParams.set(name, [...convertValues].join(VALUE_SEPARATOR));
    }
  }

  setRangeQueryParam(name: string, value: [number, number]): void {
    if (!this.url.searchParams.has(name)) {
      this.url.searchParams.append(name, this.rangeToString(value));
    } else {
      this.url.searchParams.set(name, this.rangeToString(value));
    }
  }

  setModeQueryParam(value: string): void {
    if (!this.url.searchParams.has(QueryNames.MODE)) {
      this.url.searchParams.append(QueryNames.MODE, value);
    } else {
      this.url.searchParams.set(QueryNames.MODE, value);
    }
  }

  setSortQueryParam(value: string): void {
    if (!this.url.searchParams.has(QueryNames.SORT)) {
      this.url.searchParams.append(QueryNames.SORT, value);
    } else {
      this.url.searchParams.set(QueryNames.SORT, value);
    }
  }

  rangeToString(range: [number, number]): string {
    return range.join(VALUE_SEPARATOR);
  }

  deleteQueryParam(name: string): void {
    this.url.searchParams.delete(name);
  }

  sendParams(cbRender: () => void): void {
    history.pushState(this.url.href, '', this.url.href);
    cbRender();
  }
}

export default UrlFormatter;
