import './Sidebar.style.scss';
import FilterList from '../../FilterList/FilterList';

class Sidebar {
  render(): string {
    // TODO: каждый раз получаем товары, которые отсортированы
    // ID[] из localStorage
    const categories = ['house plants', 'Potato', 'Some new staff', 'something1', 'something2', 'something3',
      'something5', 'something-create', 'some thief', 'something good', 'some thing', 'some shape', 'hint',
      'my sql', 'react', 'filters big', 'decoration'];
    const dataAmount = [['4', '23'], ['1', '23'], ['2', '23'], ['0', '23'], ['4', '23'], ['4', '23'], ['4', '23'],
      ['4', '23'], ['4', '23'], ['4', '23'], ['4', '56'], ['4', '23'], ['5', '23'], ['4', '23'],
      ['4', '23'], ['4', '23'], ['4', '23']];

    const categoryFilter = new FilterList('Categories', categories);
    return categoryFilter.render(dataAmount);
  }
}

export default Sidebar;
