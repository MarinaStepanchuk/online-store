import './FilterRange.style.scss';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { findElem } from '../../utils/findElem';
import UrlFormatter from '../../utils/UrlFormatter';

const MIN_MAX_SEPARATOR = ' - ';
enum SliderEvents {
  SLIDE = 'slide',
  END = 'end',
  CHANGE = 'change',
}

export type RangeTitle = 'price' | 'stock';

export interface IRangeOptions {
  rangeTitle: string; // must be one word without spaces!
  scaleLimits: [number, number];
  currentPoses: [number, number];
  cbRender: () => void;
  step: number;
  symbol: string;
}

class FilterRange {
  private sliderId = '';

  constructor(private readonly opt: IRangeOptions) {
    this.opt = opt;
  }

  render(): string {
    const [lowest, highest] = this.opt.currentPoses;
    const additionRangeName = this.opt.rangeTitle.toLowerCase();
    this.sliderId = `range-${additionRangeName}`;
    this.createSlider();

    return `
      <div class="range ranges__${additionRangeName}">
        <h3 class="h3 range__title">${this.opt.rangeTitle}</h3>
        <div id=${this.sliderId} class="range__line"></div>
        <div class="range__values">
          <span id="${this.opt.rangeTitle}__min" class="range__values__min">${this.opt.symbol + lowest}</span>
          ${MIN_MAX_SEPARATOR}
          <span id="${this.opt.rangeTitle}__max" class="range__values__max">${this.opt.symbol + highest}</span>
        </div>
      </div>        
      `;
  }

  createSlider(): void {
    const [lowest, highest] = this.opt.scaleLimits;

    const timer = setTimeout(() => {
      noUiSlider.create(findElem(`#${this.sliderId}`), {
        start: [...this.opt.currentPoses],
        connect: true,
        range: {
          min: lowest,
          max: highest,
        },
        step: 1,
      });

      clearTimeout(timer);
    });

    this.setHandler();
  }

  setHandler():void {
    setTimeout(() => {
      const range = document.getElementById(this.sliderId) as noUiSlider.Instance;
      const minElement = findElem(`#${this.opt.rangeTitle}__min`) as HTMLSpanElement;
      const maxElement = findElem(`#${this.opt.rangeTitle}__max`) as HTMLSpanElement;

      range.noUiSlider.on(SliderEvents.SLIDE, (values): void => {
        const [min, max] = values;
        minElement.innerText = `${min}`;
        maxElement.innerText = `${max}`;
      });
      range.noUiSlider.on(SliderEvents.END, (values): void => {
        const correctRangeName = this.opt.rangeTitle.toLowerCase() as RangeTitle;

        const urlFormatter = new UrlFormatter();
        urlFormatter.setRangeQueryParam(correctRangeName, values);
        urlFormatter.sendParams(this.opt.cbRender);
      });
      /* range.noUiSlider.on(SliderEvents.CHANGE, (): void => {
        console.log('event change');
      }); */
    });
  }
}

export default FilterRange;
