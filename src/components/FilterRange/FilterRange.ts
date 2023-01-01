import './FilterRange.style.scss';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { findElem } from '../../utils/findElem';

const MIN_MAX_SEPARATOR = ' - ';

class FilterRange {
  constructor(
    private readonly rangeTitle: string,
    private readonly scaleLimits: [number, number],
    private readonly currentPoses: [number, number],
    private readonly symbol = '',
  ) {
    this.rangeTitle = rangeTitle;
    this.scaleLimits = scaleLimits;
    this.symbol = symbol;
  }

  render(): string {
    const [lowest, highest] = this.scaleLimits;
    const additionRangeName = this.rangeTitle.toLowerCase();
    const rangeId = `range-${additionRangeName}`;
    this.createSlider(rangeId);

    return `
        <div class="range ranges__${additionRangeName}">
            <h3 class="h3 range__title">${this.rangeTitle}</h3>
            <div id=${rangeId} class="range__line"></div>
            <div class="range__values">
                <span class="range__values__min">${this.symbol + lowest}</span>
                ${MIN_MAX_SEPARATOR}
                <span class="range__values__max">${this.symbol + highest}</span>
            </div>
        </div>        
      `;
  }

  createSlider(containerId: string): void {
    const [lowest, highest] = this.scaleLimits;

    window.addEventListener('DOMContentLoaded', () => {
      noUiSlider.create(findElem(`#${containerId}`), {
        start: [...this.currentPoses],
        connect: true,
        range: {
          min: lowest,
          max: highest,
        },
        step: 1,
      });
    });
  }
}

export default FilterRange;
