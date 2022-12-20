import camelize from '../../utils/camelize';

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
        <div class="filter filters__category">
            <h3 class="h3 filter__title">Categories</h3>
            <ul class="filter__list">${filterItems}</ul>
        </div>
        `;
    };

    return `
        <aside class="filters">
            ${getCategoriesFilter()}
        </aside>
    `;
  }
}

export default FilterList;
