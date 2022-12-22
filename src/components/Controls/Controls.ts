import './Controls.style.scss';
import modeGrid3Icon from '../../assets/svg/grid3_icon.svg';
import modeGrid4Icon from '../../assets/svg/grid4_icon.svg';

interface IControlsParams {

}
enum viewMode {
    grid3,
    grid4
}

class Controls {
    constructor(params: IControlsParams) {
    }
    render():string {
        const getSortBlock = (): string => `<div></div>`
        const getSearchBlock = (value: string): string => `<div></div>`
        const getModeBlock = (value: viewMode): string => {
            return `
                <div class="controls__mode">
                    <div class="controls__mode__item">
                        <img src=${modeGrid3Icon} alt="icon mode">
                    </div>
                    <div class="controls__mode__item">
                        <img src=${modeGrid4Icon} alt="icon mode">
                    </div>
                </div>`
        }

        return `
        <div class="controls">
            ${getSortBlock()}
            ${getSearchBlock('goods')}
            ${getModeBlock(viewMode.grid4)}
        </div>`
    }
}

export default Controls;
