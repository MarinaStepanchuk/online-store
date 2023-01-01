import './Sidebar.style.scss';
import FilterList from '../../FilterList/FilterList';
import FilterRange from '../../FilterRange/FilterRange';
import Database from '../../../database/Database';
import { Symbol } from '../../../common.types/enums';
import { IProcessedData } from '../../../database/DataBase.interfaces';
import { FilterParamTitles } from './Sidebar.enum';

class Sidebar {
  render(data: IProcessedData): string {
    const categoryFilter = new FilterList(FilterParamTitles.categories, data.categories);
    const brandFilter = new FilterList(FilterParamTitles.brands, data.brands);
    const priceRange = new FilterRange(FilterParamTitles.price, Database.getMinMaxPrice(), Symbol.CURRENCY);
    const stockRange = new FilterRange(FilterParamTitles.stock, Database.getMinMaxStock());

    return `
      <aside class="filters">
        ${categoryFilter.render()}
        ${brandFilter.render()}
        ${priceRange.render()}
        ${stockRange.render()}
      </aside>
    `;
  }
}

export default Sidebar;
