import './Sidebar.style.scss';
import FilterList from '../../FilterList/FilterList';
import FilterRange from '../../FilterRange/FilterRange';
import Database from '../../../database/Database';
import { Symbol } from '../../../common.types/enums';
import { IProcessedData } from '../../../database/DataBase.interfaces';
import { FilterParamTitles } from './Sidebar.enum';
import { findElem } from '../../../utils/findElem';

class Sidebar {
  render(data: IProcessedData): string {
    const {
      categoryFilter, brandFilter, priceRange, stockRange,
    } = this.getComponents(data);

    return `
      <aside class="filters">
        ${categoryFilter.render()}
        ${brandFilter.render()}
        ${priceRange.render()}
        ${stockRange.render()}
      </aside>
    `;
  }

  rerender(data: IProcessedData) {
    const {
      categoryFilter, brandFilter, priceRange, stockRange,
    } = this.getComponents(data);

    findElem('.filters').innerHTML = categoryFilter.render() + brandFilter.render() + priceRange.render() + stockRange.render();
  }

  getComponents(data: IProcessedData) {
    return {
      categoryFilter: new FilterList(FilterParamTitles.categories, data.categories),
      brandFilter: new FilterList(FilterParamTitles.brands, data.brands),
      priceRange: new FilterRange(FilterParamTitles.price, Database.getMinMaxPrice(), Symbol.CURRENCY),
      stockRange: new FilterRange(FilterParamTitles.stock, Database.getMinMaxStock()),
    };
  }
}

export default Sidebar;
