import camelize from '../../utils/camelize';
import './FilterList.style.scss';

class FilterList {
  private filterTitle: string;

  private filterList: string[];

  constructor(filterTitle: string, filterList: string[]) {
    this.filterTitle = filterTitle;
    this.filterList = filterList;
  }

  render(amount: string[][]): string {
    const getFilterItem = (name: string, [displayedAmount, totalAmount]: string[]): string => {
      const id = `${camelize(name)}${this.filterTitle}`;

      return `
        <li class="filter__item">
            <input id=${id} class="filter__item__input" type="checkbox">
            <label for=${id} class="filter__item__label">
                <span class="filter__item__name">${name}</span>
                <span class="filter__item__amount-block">(${displayedAmount}/${totalAmount})</span>
            </label>
        </li>
    `;
    };

    const getCategoriesFilter = () => {
      let filterItems = '';

      this.filterList.forEach((category: string, idx: number) => {
        filterItems += getFilterItem(category, amount[idx]);
      });

      return `
        <div class="filter filters__${this.filterTitle.toLowerCase()}">
            <h3 class="h3 filter__title">${this.filterTitle}</h3>
            <ul class="filter__list ${this.filterTitle.toLowerCase()}">${filterItems}</ul>
        </div>
        `;
    };

    return getCategoriesFilter();
  }
}

export default FilterList;
