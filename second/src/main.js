import { usersList } from './features/users-list/index.js';
import { render } from './libs/render.js';

const app = document.getElementById('app');

render(usersList, app);
