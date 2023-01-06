import './Controls.style.scss';
import modeGrid3Icon from '../../assets/svg/grid3_icon.svg';
import modeGrid4Icon from '../../assets/svg/grid4_icon.svg';
import searchIcon from '../../assets/svg/search_icon.svg';
import searchCross from '../../assets/svg/search_cross.svg';
import { IProcessedData } from '../../database/DataBase.interfaces';
import Handler from '../../utils/Handler';
import { Events } from '../../common.types/enums';
import { findElem } from '../../utils/findElem';
import UrlFormatter, { QueryNames } from '../../utils/UrlFormatter';
import { DEFAULT_MODE } from '../ProductsGrid/ProductsGrid.const';
import {
  SEARCH_PLACEHOLDER, SEARCH_RESULT_TITLE, SORT_TITLE, SortNames,
} from './Controls.const';
import { SortValues, ViewMode } from './Controls.enum';

class Controls {
  constructor(private readonly cbRender: () => void) {
    this.cbRender = cbRender;
  }

  render(data: IProcessedData):string {
    this.setHandlers(data.mode);
    const productsAmount = data.productsId.size as number;
    const searchText = data.search as string;

    return `
      <div class="controls">
        ${this.getSortBlock(data.sort)}
        ${this.getSearchBlock(productsAmount, searchText)}
        ${this.getModeBlock(data.mode || DEFAULT_MODE)}
      </div>`;
  }

  getSortBlock(sortType: string): string {
    return `
      <div class="controls__sort sorter">
        <span class="sorter__title">${SORT_TITLE}</span>
        <div class="sorter__droplist-wrap">
          <select class="sorter__droplist" name="sort" id="sorter-droplist">
            /* <option ${SortValues.none === sortType ? 'selected' : ''} value=${SortValues.none}>
              ${SortNames.none}
            </option> */
            <option ${SortValues.upDiscount === sortType ? 'selected' : ''} value=${SortValues.upDiscount}>
              ${SortNames.discount.fromLowToHigh}
            </option>
            <option ${SortValues.downDiscount === sortType ? 'selected' : ''} value=${SortValues.downDiscount}>
              ${SortNames.discount.fromHighToLow}
            </option>
            <option ${SortValues.upStock === sortType ? 'selected' : ''} value=${SortValues.upStock}>
              ${SortNames.stock.fromLowToHigh}
            </option>
            <option ${SortValues.downStock === sortType ? 'selected' : ''} value=${SortValues.downStock}>
              ${SortNames.stock.fromHighToLow}
            </option>
          </select>
        </div>
      </div>`;
  }

  getSearchBlock(amount: number, search: string): string {
    return `
      <div class="controls__search search">
        <div class="search__result">
          <span class="search__result__title">${SEARCH_RESULT_TITLE}</span>
          <span class="search__result__amount" id="search-amount">${amount}</span>
        </div>
        <div class="search__input-wrap">
          <input type="text" class="search__input" id="search-input" placeholder=${SEARCH_PLACEHOLDER} 
              autofocus autocomplete="off" value=${search}>
          <button id="reset-search-btn"  class="search__reset">
            <img src=${searchCross} alt="reset search">
          </button>
        </div>
        <button id="search-btn" class="search__icon">
            <img src=${searchIcon} alt="search icon">
        </button>
      </div>
    `;
  }

  getModeBlock(mode: string): string {
    return `
      <div class="controls__mode">
        <div class="controls__mode__item ${mode === ViewMode.grid3 ? 'active' : ''}" 
            id="switch-${ViewMode.grid3}-btn" data-view-mode=${ViewMode.grid3}>
          <img src=${modeGrid3Icon} alt="icon mode">
        </div>
        <div class="controls__mode__item ${mode === ViewMode.grid4 ? 'active' : ''}" 
            id="switch-${ViewMode.grid4}-btn" data-view-mode=${ViewMode.grid4}>
          <img src=${modeGrid4Icon} alt="icon mode">
        </div>
      </div>`;
  }

  setHandlers(mode: string): void {
    // search button
    Handler.set(Events.CLICK, (): void => {
      const inputField = findElem('#search-input') as HTMLInputElement;

      const urlFormatter = new UrlFormatter();
      urlFormatter.setFiltersQueryParam(QueryNames.SEARCH, inputField.value);
      urlFormatter.sendParams(this.cbRender);
    }, '#search-btn');

    // reset search button
    Handler.set(Events.CLICK, (): void => {
      const urlFormatter = new UrlFormatter();
      urlFormatter.deleteQueryParam(QueryNames.SEARCH);
      urlFormatter.sendParams(this.cbRender);
    }, '#reset-search-btn');

    // switcher mode
    Handler.set(Events.CLICK, (e: Event): void => {
      const target = e.target as HTMLElement;
      const wrapper = target.parentElement as HTMLElement;

      if (wrapper.dataset.viewMode && wrapper.dataset.viewMode !== mode) {
        const urlFormatter = new UrlFormatter();
        urlFormatter.setModeQueryParam(wrapper.dataset.viewMode);
        urlFormatter.sendParams(this.cbRender);
      }
    }, '.controls__mode');

    // sorting
    Handler.set(Events.INPUT, (e: Event) => {
      const target = e.target as HTMLInputElement;
      const urlFormatter = new UrlFormatter();
      urlFormatter.setSortQueryParam(target.value);
      urlFormatter.sendParams(this.cbRender);
    }, '#sorter-droplist');
  }
}

export default Controls;
