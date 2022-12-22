import './styles/common.styles.scss';
import RouterHash from './Router/RouterHash';

window.addEventListener('load', RouterHash.router);
window.addEventListener('hashchange', RouterHash.router);
