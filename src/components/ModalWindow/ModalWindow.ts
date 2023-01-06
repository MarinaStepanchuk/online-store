import './ModalWindow.styles.scss';
import { findElem } from '../../utils/findElem';
import getMainBlock from '../../utils/getMainBlock';
import cardLogoDef from '../../assets/img/card-logo.webp';

class ModalWindow {
  remove() {
    const modal = findElem('.modal');
    modal.remove();
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('modal');
    const main = getMainBlock();
    main.append(div);
    div.innerHTML = `
      <div class="modal-content">
        <form novalidate>
          <div class="modal-content__personal-details">
            <div class="modal-content__personal-details__title">Personal details</div>
            <div class="modal-content__personal-details__item">
              <div class="modal-content__personal-details__item__title">
                <span class="modal-content__personal-details__item__title__value">Name</span>
                <span class="modal-content__personal-details__item__title__mark">*</span>
              </div>
              <div class="modal-content__personal-details__item__value">
                <input id="personal-name" class="modal-content__personal-details__item__value__input" type="text" placeholder="Name">
                <div class="modal-content__personal-details__item__value__error-message">Error</div>
              </div>
            </div>
            <div class="modal-content__personal-details__item">
              <div class="modal-content__personal-details__item__title">
                <span class="modal-content__personal-details__item__title__value">Phone number</span>
                <span class="modal-content__personal-details__item__title__mark">*</span>
              </div>
              <div id="personal-phone" class="modal-content__personal-details__item__value">
                <input class="modal-content__personal-details__item__value__input" type="text" placeholder="Phone number">
                <div class="modal-content__personal-details__item__value__error-message">Error</div>
              </div>
            </div>
            <div class="modal-content__personal-details__item">
              <div class="modal-content__personal-details__item__title">
                <span class="modal-content__personal-details__item__title__value">Delivery address</span>
                <span class="modal-content__personal-details__item__title__mark">*</span>
              </div>
              <div id="personal-address" class="modal-content__personal-details__item__value">
                <input class="modal-content__personal-details__item__value__input" type="text" placeholder="Delivery address">
                <div class="modal-content__personal-details__item__value__error-message">Error</div>
              </div>
            </div>
            <div class="modal-content__personal-details__item">
              <div class="modal-content__personal-details__item__title">
                <span class="modal-content__personal-details__item__title__value">E-mail</span>
                <span class="modal-content__personal-details__item__title__mark">*</span>
              </div>
              <div id="personal-main" class="modal-content__personal-details__item__value">
                <input class="modal-content__personal-details__item__value__input" type="text" placeholder="E-mail">
                <div class="modal-content__personal-details__item__value__error-message">Error</div>
              </div>
            </div>
          </div>
          <div class="modal-content__card-details">
            <div class="modal-content__card-details__title">Credit card details</div>
            <div class="modal-content__card-details__card">
              <div class="modal-content__card-details__card__number">
                <img src="${cardLogoDef}" alt="payment system">
                <input type="text" id="card-number" placeholder="Card number">
              </div>
              <div class="modal-content__card-details__card__other">
                <div class="modal-content__card-details__card__other__valid">
                  <span>VALID:</span>
                  <input type="text" id="card-valid" placeholder="Valid Thru">
                </div>
                <div class="modal-content__card-details__card__other__cvv">
                  <span>CVV:</span>
                  <input type="text" id="card-cvv" placeholder="Code">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-content__error-card">
          <div class="modal-content__error-card__message">Card error</div>
          <div class="modal-content__error-card__message">Card error</div>
          <div class="modal-content__error-card__message">Card error</div>
          </div>
          <button class="modal-content__submit" type="submit">CONFIRM</button>
        </form>
      </div>
    `;
  }
}

export default ModalWindow;
