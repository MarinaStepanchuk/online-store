import './Sidebar.style.scss';
import FilterList from '../../FilterList/FilterList';
import FilterRange from '../../FilterRange/FilterRange';

class Sidebar {
  render(): string {
    // TODO: каждый раз получаем товары, которые отсортированы
    // ID[] из localStorage
    const categories = ['house plants', 'Potato', 'Some new staff', 'something1', 'something2', 'something3',
      'something5', 'something-create', 'some thief', 'something good', 'some thing', 'some shape', 'hint',
      'my sql', 'react', 'filters big', 'decoration'];
    const dataCategoriesAmount = [['4', '23'], ['1', '23'], ['2', '23'], ['0', '23'], ['4', '23'], ['4', '23'], ['4', '23'],
      ['4', '23'], ['4', '23'], ['4', '23'], ['4', '56'], ['4', '23'], ['5', '23'], ['4', '23'],
      ['4', '23'], ['4', '23'], ['4', '23']];
    const brands = ['Adidas', 'Gussi', 'MAN', 'Belka', 'some', 'Kit', 'Absolute', 'Kitchen', 'Romero', 'God',
      'react', 'filtron', 'decoration tank'];
    const dataBrandsAmount = [['4', '15'], ['1', '2'], ['2', '3'], ['0', '23'], ['4', '23'], ['4', '23'], ['4', '23'],
      ['4', '23'], ['4', '23'], ['4', '23'], ['4', '56'], ['4', '23'], ['5', '23']];

    const categoryFilter = new FilterList('Categories', categories);
    const brandFilter = new FilterList('Brand', brands);
    const priceRange = new FilterRange('Price', [12, 560], '$');
    const stockRange = new FilterRange('Stoke', [12, 560]);

    return `
      <aside class="filters">
        ${categoryFilter.render(dataCategoriesAmount)}
        ${brandFilter.render(dataBrandsAmount)}
        ${priceRange.render()}
        ${stockRange.render()}
      </aside>
    `;
  }
}

export default Sidebar;
