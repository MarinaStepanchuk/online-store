import { findElem } from '../../utils/findElem';

type Callback = (e: Event) => void;

class FilterListHandler {
  static setEvent(type: string, cb: Callback, ownerSelector: string): void {
    setTimeout(() => {
      findElem(ownerSelector).addEventListener(type, cb);
    });
  }
}

export default FilterListHandler;
