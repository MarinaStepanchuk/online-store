import './Controls.style.scss';
import modeGrid3Icon from '../../assets/svg/grid3_icon.svg';
import modeGrid4Icon from '../../assets/svg/grid4_icon.svg';
import searchIcon from '../../assets/svg/search_icon.svg';
import searchCross from '../../assets/svg/search_cross.svg';
import { IProcessedData } from '../../database/DataBase.interfaces';
import Handler from '../../utils/Handler';
import { Events } from '../../common.types/enums';
import { findElem } from '../../utils/findElem';
import FiltersState from '../../utils/FiltersState';
import UrlFormatter from '../../utils/UrlFormatter';

const SORT_TITLE = 'Sort by:';
const SortingNames = {
  discount: {
    fromLowToHigh: '▲ discount',
    fromHighToLow: '▼ discount',
  },
  stock: {
    fromLowToHigh: '▲ in stock',
    fromHighToLow: '▼ in stock',
  },
};
const SEARCH_RESULT_TITLE = 'Found:';
const SEARCH_PLACEHOLDER = 'search';

enum ViewMode {
  grid3,
  grid4,
}

class Controls {
  render(data: IProcessedData):string {
    this.setHandlers();
    const productsAmount = data.productsId.size as number;
    const searchText = data.search as string;

    return `
      <div class="controls">
        ${this.getSortBlock()}
        ${this.getSearchBlock(productsAmount, searchText)}
        ${this.getModeBlock(ViewMode.grid3)}
      </div>`;
  }

  getSortBlock(): string {
    return `
      <div class="controls__sort sorter">
        <span class="sorter__title">${SORT_TITLE}</span>
        <div class="sorter__droplist-wrap">
          <select class="sorter__droplist" name="sort" id="sorter-droplist">
            <option value="upDiscount">${SortingNames.discount.fromLowToHigh}</option>
            <option value="downDiscount">${SortingNames.discount.fromHighToLow}</option>
            <option value="upStock">${SortingNames.stock.fromLowToHigh}</option>
            <option value="downStock">${SortingNames.stock.fromHighToLow}</option>
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

  getModeBlock(value: ViewMode): string {
    return `
      <div class="controls__mode">
        <div class="controls__mode__item ${value === ViewMode.grid3 ? 'active' : ''}">
          <img src=${modeGrid3Icon} alt="icon mode">
        </div>
        <div class="controls__mode__item ${value === ViewMode.grid4 ? 'active' : ''}">
          <img src=${modeGrid4Icon} alt="icon mode">
        </div>
      </div>`;
  }

  setHandlers(): void {
    // search button
    Handler.set(Events.CLICK, () => {
      const inputField = findElem('#search-input') as HTMLInputElement;
      const updState = { ...FiltersState.getState(), search: inputField.value };

      FiltersState.setState(updState);
      new UrlFormatter().setQueryParams(updState);
    }, '#search-btn');

    // reset search button
    Handler.set(Events.CLICK, () => {
      const updState = { ...FiltersState.getState(), search: '' };

      FiltersState.setState(updState);
      new UrlFormatter().setQueryParams(updState);
    }, '#reset-search-btn');
  }
}

export default Controls;
