import { randomId } from '../libs/random-id.js';
import { USERS_MOCKS } from './mocks.js';

const wait = (p) => new Promise((r) => setTimeout(r, 300, p));

export const getUsers = () => wait(USERS_MOCKS);

export const removeUser = () => {};

export const addUser = (payload) => ({
  ...payload,
  id: randomId(),
});

export const updateUser = (payload) => wait(payload);
