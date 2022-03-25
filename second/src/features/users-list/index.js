import { api } from '../../api/index.js';
import { createState } from '../../libs/create-state.js';
import { usersTable } from './users-table.js';

export const usersList = async () => {
  const [users, setUsers, usersUpdated] = createState([]);
  const renderTaker = document.createDocumentFragment();

  const init = async () => {
    const users = await api.getUsers();
    setUsers(users);
  };

  const updateUser = async (payload) => {
    const user = await api.updateUser(paylaod);
    setUsers();
    usersRef?.replaceWith({ users });
  };

  const deleteUser = async (payload) => {
    await api.removeUser(payload);
    setUsers((users) => users.filter((user) => user.id !== payload.id));
  };

  let usersRef = usersTable({ users, handlers: { updateUser, deleteUser } });

  usersUpdated((users) => {
    console.log('here', users);
    const node = usersTable({ users, handlers: { updateUser, deleteUser } });

    usersRef.replaceWith(node);

    usersRef = node;
  });

  await init();

  renderTaker.append(usersRef);
  return renderTaker;
};
