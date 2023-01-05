class QueryParamsBasket {
  private param: URLSearchParams;

  constructor() {
    this.param = new URLSearchParams(window.location.search);
  }

  public getAllParams(): string {
    return this.param.toString();
  }

  public setParam(key: string, value: string): void {
    this.param.set(key, value);
  }

  public getParam(key: string): string | null {
    return this.param.get(key);
  }

  public sendParams(cb: () => void): void {
    const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const newUrl = `${baseUrl}?${this.param.toString()}`;
    window.history.pushState(null, '', newUrl);
    cb();
  }
}

export default QueryParamsBasket;
