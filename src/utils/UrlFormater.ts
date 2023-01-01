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

  private objQueryParams: Record<string, string[]> = {};

  constructor() {
    this.url = new URL(window.location.href);
    this.separators = {
      value: '↕',
      param: '&',
    };
  }

  readAllQueryParams() {
    [...this.url.searchParams].forEach(([name, value]) => {
      this.objQueryParams[name] = value.split(this.separators.value).map((v) => decodeURI(v));
    });
  }

  getAllQueryParams() {
    this.readAllQueryParams();
    return this.objQueryParams;
  }

  changeQueryUrl() {
    const entries = Object.entries(this.objQueryParams);

    if (entries.length) {
      this.url.search = `?${entries
        .map(([name, values]) => `${name}=${values.map((v) => encodeURI(v)).join(this.separators.value)}`)
        .join(this.separators.param)}`;
    }

    // history.replaceState(null, '', this.url);
  }

  setQueryParam(name: string, value: string) {
    this.readAllQueryParams();

    if (this.objQueryParams[name]) {
      this.objQueryParams[name].push(encodeURI(value));
    } else {
      this.objQueryParams[name] = [value];
    }

    this.changeQueryUrl();
  }
}

export default UrlFormater;
