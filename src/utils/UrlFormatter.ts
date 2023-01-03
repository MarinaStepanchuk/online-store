import { IPageParams, IStateParams } from '../database/DataBase.interfaces';

export enum QueryNames {
  CATEGORY = 'category',
  BRAND = 'brand',
  PRICE = 'price',
  STOCK = 'stock',
  MODE = 'mode',
  SORT = 'sort',
  SEARCH = 'search',
}

/* type ParamsNames = 'category' | 'brand' | 'price' | 'stock' | 'mode' | 'sort' | 'search'; */

class UrlFormatter {
  private readonly url: URL;

  private readonly separators: Record<string, string>;

  private objQueryParams: IPageParams = {};

  constructor() {
    this.url = new URL(window.location.href);
    this.separators = {
      value: '↕',
      param: '&',
    };
  }

  readAllQueryParams(): void {
    const temp: Record<string, string> = {};

    [...this.url.searchParams].forEach(([name, values]) => {
      temp[name] = values;
    });

    this.objQueryParams.category = new Set(temp.category?.split(this.separators.value));
    this.objQueryParams.brand = new Set(temp.brand?.split(this.separators.value));
    this.objQueryParams.search = temp.search?.toLowerCase() || '';
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
  }

  setQueryParams(state: IStateParams): void {
    this.url.search = this.getQueryStringByState(state);
    location.search = this.url.search;
  }

  getQueryStringByState(state: IStateParams): string {
    const adaptedState = {
      ...state,
      category: [...state.category],
      brand: [...state.brand],
      mode: state.mode ? [state.mode] : [],
      search: state.search ? [state.search] : [],
      sort: state.sort ? [state.sort] : [],
    };

    const entries = Object.entries(adaptedState);

    return entries
      .filter(([, values]) => values.length)
      .map(([name, values]) => `${name}=${[...values].map((v) => encodeURI(`${v}`)).join(this.separators.value)}`)
      .join(this.separators.param);
  }

  isExistedQuery(): boolean {
    return !!this.url.search;
  }
}

export default UrlFormatter;
