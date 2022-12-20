import './WelcomeBlock.style.scss';
import background from '../../assets/img/background_main.jpg';

class WelcomeBlock {
  render(): string {
    return `
        <section class="shopnow">
            <img class="shopnow__background" src=${background} alt="background shop now">
            <h1 class="h1 shopnow__title">WELCOME TO CHRISTMAS SHOP</h1>
            <div class="shopnow__subtitle">ADD SOME SPARKLE TO <span class="shopnow__subtitle_red">Christmas</span></div>
            <button class="shopnow__button">SHOP NOW</button>
        </section>
        `;
  }
}

export default WelcomeBlock;
