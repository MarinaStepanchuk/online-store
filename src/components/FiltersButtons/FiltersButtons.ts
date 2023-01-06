import './FiltersButtons.style.scss';
import Handler from '../../utils/Handler';
import { Events } from '../../common.types/enums';
import UrlFormatter from '../../utils/UrlFormatter';

const COPY_BTN_INNER_TEXT = 'Copy link';
const RESET_BTN_INNER_TEXT = 'Reset filters';

class FiltersButtons {
  constructor(private readonly cbRender: () => void) {
    this.cbRender = cbRender;
  }

  render(): string {
    this.setHandler();

    return `
      <div class="filters__buttons">
        <button class="filters__buttons__item" id="copy-link">${COPY_BTN_INNER_TEXT}</button>
        <button class="filters__buttons__item" id="reset-filters">${RESET_BTN_INNER_TEXT}</button>
      </div>
      `;
  }

  setHandler():void {
    Handler.set(Events.CLICK, () => {
      const urlFormatter = new UrlFormatter();
      urlFormatter.cleanAllQueryParams();
      urlFormatter.sendParams(this.cbRender);
    }, '#reset-filters');

    Handler.set(Events.CLICK, () => {
      const text = `${location.href}`;

      navigator.clipboard.writeText(text)
        .then((r) => r);
    }, '#copy-link');
  }
}

export default FiltersButtons;
