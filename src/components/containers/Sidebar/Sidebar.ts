import './Sidebar.style.scss';
import FilterList from '../../FilterList/FilterList';
import FilterRange, { IRangeOptions } from '../../FilterRange/FilterRange';
import { Symbol } from '../../../common.types/enums';
import { IProcessedData } from '../../../database/DataBase.interfaces';
import { FilterParamTitles } from './Sidebar.enum';

class Sidebar {
  constructor(private readonly cbRender: () => void) {
    this.cbRender = cbRender;
  }

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

  getComponents(data: IProcessedData) {
    const priceOptions: IRangeOptions = {
      rangeTitle: FilterParamTitles.price,
      scaleLimits: data.priceScale,
      currentPoses: data.price,
      cbRender: this.cbRender,
      step: 0.01,
      symbol: Symbol.CURRENCY,
    };
    const stockOptions: IRangeOptions = {
      rangeTitle: FilterParamTitles.stock,
      scaleLimits: data.stockScale,
      currentPoses: data.stock,
      cbRender: this.cbRender,
      step: 1,
      symbol: '',
    };
    return {
      categoryFilter: new FilterList(FilterParamTitles.categories, data.categories, this.cbRender),
      brandFilter: new FilterList(FilterParamTitles.brands, data.brands, this.cbRender),
      priceRange: new FilterRange(priceOptions),
      stockRange: new FilterRange(stockOptions),
    };
  }
}

export default Sidebar;
