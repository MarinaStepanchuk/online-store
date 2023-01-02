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

class UrlFormater {
  private readonly url: URL;

  private readonly separators: Record<string, string>;

  private objQueryParams: Record<string, Set<string>> = {};

  constructor() {
    this.url = new URL(window.location.href);
    this.separators = {
      value: '↕',
      param: '&',
    };
  }

  readAllQueryParams(): void {
    [...this.url.searchParams].forEach(([name, value]) => {
      this.objQueryParams[name] = new Set(value.split(this.separators.value).map((v) => decodeURI(v)));
    });
  }

  getAllQueryParams(): IPageParams {
    this.readAllQueryParams();
    return this.objQueryParams;
  }

  changeQueryUrl(): void {
    const entries = Object.entries(this.objQueryParams);

    if (entries.length) {
      this.url.search = `?${entries
        .map(([name, values]) => `${name}=${[...values].map((v) => encodeURI(v)).join(this.separators.value)}`)
        .join(this.separators.param)}`;
    }

    // eslint-disable-next-line no-restricted-globals
    location.search = this.url.search;
  }

  setQueryParam(name: string, value: string): void {
    this.readAllQueryParams();

    if (this.objQueryParams[name]) {
      this.objQueryParams[name].add(value);
    } else {
      this.objQueryParams[name] = new Set();
      this.objQueryParams[name].add(value);
    }

    this.changeQueryUrl();
  }

  deleteQueryParam(name: string, value: string): void {
    this.readAllQueryParams();

    if (this.objQueryParams[name].size === 1) {
      delete this.objQueryParams[name];
    } else {
      this.objQueryParams[name].delete(value);
    }

    this.changeQueryUrl();
  }
}

export default UrlFormater;
