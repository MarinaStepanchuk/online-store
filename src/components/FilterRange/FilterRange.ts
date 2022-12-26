import './FilterRange.style.scss';

const MIN_MAX_SEPARATOR = ' - ';

class FilterRange {
  private readonly rangeTitle: string;

  private readonly scaleLimits: [number, number];

  private readonly symbol: string;

  constructor(rangeTitle: string, scaleLimits: [number, number], symbol = '') {
    this.rangeTitle = rangeTitle;
    this.scaleLimits = scaleLimits;
    this.symbol = symbol;
  }

  render(): string {
    const [lowest, highest] = this.scaleLimits;
    const additionRangeName = this.rangeTitle.toLowerCase();
    const rangeId = `range-${additionRangeName}`;

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
}

export default FilterRange;
