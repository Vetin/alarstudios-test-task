import { api } from '../../api/index.js';
import { createElement } from '../../libs/ui/create-element.js';
import { createState } from '../../libs/ui/create-state.js';
import { AddUser } from './add-user.js';
import { TableHeader } from './table-header.js';
import { UsersTable } from './users-table.js';

export const usersList = async () => {
  const [users, setUsers, usersUpdated] = createState([]);

  const init = async () => {
    const users = await api.getUsers();
    setUsers(users);
  };

  const addUser = async (user) => {
    const createdUser = await api.addUser(user);
    setUsers((users) => users.concat(createdUser));
  };

  const updateUser = async (payload) => {
    const user = await api.updateUser(payload);

    setUsers((users) => {
      const userIdx = users.findIndex((u) => u.id === user.id);
      users[userIdx] = user;
      return users;
    });
  };

  const deleteUser = async (payload) => {
    await api.removeUser(payload);
    setUsers((users) => users.filter((user) => user.id !== payload.id));
  };

  let usersRef = UsersTable({ users, handlers: { updateUser, deleteUser } });

  usersUpdated((users) => {
    const node = UsersTable({ users, handlers: { updateUser, deleteUser } });
    usersRef = usersRef.replace(node);
  });

  await init();

  return createElement({
    tag: 'div',
    attrs: {
      className: 'users-table',
    },
    children: [TableHeader(), usersRef, AddUser({ addUser, className: 'users-table__row' })],
  });
};
