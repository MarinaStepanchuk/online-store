import './Controls.style.scss';
import modeGrid3Icon from '../../assets/svg/grid3_icon.svg';
import modeGrid4Icon from '../../assets/svg/grid4_icon.svg';
import searchIcon from '../../assets/svg/search_icon.svg';
import searchCross from '../../assets/svg/search_cross.svg';

const SORT_TITLE = 'Sort by:';
const SEARCH_RESULT_TITLE = 'Found:';

/* interface IControlsParams {

} */

enum ViewMode {
  grid3,
  grid4,
}

class Controls {
  /* constructor(params: IControlsParams) {
  } */

  render():string {
    const getSortBlock = (): string => `
        <div class="controls__sort sorter">
            <span class="sorter__title">${SORT_TITLE}</span>
            <div class="sorter__droplist-wrap">
              <select class="sorter__droplist" name="sort" id="sorter-droplist">
                <option value="upDiscount">▲ discount</option>
                <option value="downDiscount">▼ discount</option>
                <option value="upStock">▲ in stock</option>
                <option value="downStock">▼ in stock</option>
              </select>
            </div>
        </div>`;

    const getSearchBlock = (value: string): string => `
        <div class="controls__search search">
            <div class="search__result">
                <span class="search__result__title">${SEARCH_RESULT_TITLE}</span>
                <span class="search__result__amount" id="search-amount">56</span>
            </div>
            <div class="search__input-wrap">
                <input type="text" class="search__input" id="search-input" placeholder="search" 
                    autofocus autocomplete="off" value=${value}>
                <img class="search__reset" src=${searchCross} class="search__reset" alt="reset search">
            </div>
            <img class="search__icon" src=${searchIcon} alt="search icon">
        </div>
    `;

    const getModeBlock = (value: ViewMode): string => `
        <div class="controls__mode">
            <div class="controls__mode__item ${value === ViewMode.grid3 ? 'active' : ''}">
                <img src=${modeGrid3Icon} alt="icon mode">
            </div>
            <div class="controls__mode__item ${value === ViewMode.grid4 ? 'active' : ''}">
                <img src=${modeGrid4Icon} alt="icon mode">
            </div>
        </div>`;

    return `
        <div class="controls">
            ${getSortBlock()}
            ${getSearchBlock('goods')}
            ${getModeBlock(ViewMode.grid3)}
        </div>`;
  }
}

export default Controls;
