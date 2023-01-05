/*
import { IStateParams } from '../database/DataBase.interfaces';

const FILTER_STATE_KEY = 'app_filters_state';

class FiltersState {
  static getInitState(): IStateParams {
    return {
      category: new Set(),
      brand: new Set(),
      price: [],
      stock: [],
      mode: '',
      sort: '',
      search: '',
    };
  }

  static checkState() {
    if (!FiltersState.getState()) {
      FiltersState.setState(FiltersState.getInitState());
    }
  }

  static setState(state: IStateParams): void {
    const convertedState = {
      ...state,
      category: [...state.category],
      brand: [...state.brand],
    };
    sessionStorage.setItem(FILTER_STATE_KEY, JSON.stringify(convertedState));
  }

  static getState(): IStateParams {
    const state = JSON.parse(sessionStorage.getItem(FILTER_STATE_KEY) || 'null');

    return state
      ? {
        ...state,
        category: new Set(state.category),
        brand: new Set(state.brand),
      } : false;
  }
}

export default FiltersState;
*/
