import './FilterRange.style.scss';

class FilterRange {
  private readonly rangeTitle: string;

  private readonly range: number[];

  private readonly symbol: string;

  constructor(rangeTitle: string, range: number[], symbol = '') {
    this.rangeTitle = rangeTitle;
    this.range = range;
    this.symbol = symbol;
  }

  render(): string {
    const [min, max] = this.range;

    return `
        <div class="range ranges__${this.rangeTitle.toLowerCase()}">
            <h3 class="h3 range__title">${this.rangeTitle}</h3>
            <input type="range" class="range__line">
            <span class="range__values">${this.symbol + min} - ${this.symbol + max}</span>
        </div>        
      `;
  }
}

export default FilterRange;
