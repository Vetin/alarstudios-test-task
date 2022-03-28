import { createElement } from '../../libs/ui/create-element.js';
import { createState } from '../../libs/ui/create-state.js';
import { replaceNode } from '../../libs/ui/replace-node.js';
import { Input } from '../../ui/input.js';
import { alert } from '../alert.js';
import { validateUser } from './validators.js';

/** @typedef {import('../../api/index').User} User */

/** @typedef {{'view' | 'edit'}} ViewMode */

/** @typedef  {{updateUser: (payload: {id: string, name: string, phone: string}) => Promise<{}>, deleteUser: (payload: {id: string}) => Promise<void>}} renderUsersTableHanders */

/** @typedef {{user:User, handlers: renderUsersTableHanders, onModifyClick: () => void, mode: ViewMode }} RowUnitPayload  */

/** @param {ViewMode} mode */
const inverseMode = (mode) => (mode === 'view' ? 'edit' : 'view');

/**
 * @param {{users: User[], handlers: renderUsersTableHandlers}} payload
 */
export const UsersTable = (payload) => {
  const { users, handlers } = payload;

  const changeMode = async (payload) => {
    const { mode: nextMode, user } = payload;

    const payloadMode = inverseMode(nextMode);
    const updatedNode = GET_CREATOR_BY_MODE[nextMode]({
      user,
      handlers,
      onModifyClick: (user) => changeMode({ user, mode: payloadMode }),
      mode: nextMode,
    });

    if (nextMode === 'view') {
      await handlers.updateUser(user);
    } else {
      replaceNode(user.id, updatedNode);
    }
  };

  return createElement({
    tag: 'fragment',
    children: users.map((user) =>
      GET_CREATOR_BY_MODE['view']({
        handlers,
        onModifyClick: (user) => changeMode({ user, mode: inverseMode('view') }),
        user,
        mode: 'view',
      }),
    ),
  });
};

/**
 * @param {RowUnitPayload} payload
 */
const rowActions = (payload) => {
  const { user, handlers, onModifyClick, mode } = payload;

  const modifyText = mode === 'edit' ? 'Сохранить' : 'Редактировать';

  const handleDeleteButtonClick = () => {
    handlers.deleteUser(user);
  };

  return createElement({
    tag: 'div',
    attrs: {
      className: 'users-table__row__actions',
    },
    children: [
      createElement({
        tag: 'button',
        attrs: { textContent: modifyText },
        handlers: [{ type: 'click', fn: () => onModifyClick(user) }],
      }),
      createElement({
        tag: 'button',
        attrs: { textContent: 'Удалить' },
        handlers: [
          {
            type: 'click',
            fn: handleDeleteButtonClick,
          },
        ],
      }),
    ],
  });
};

const rowWrapper = ({ identifier, children }) =>
  createElement({
    tag: 'div',
    attrs: { className: 'users-table__row' },
    children,
    identifier,
  });

/** @param {RowUnitPayload} payload */
const viewRow = (payload) => {
  const { user, handlers, onModifyClick, mode } = payload;

  const { name, phone } = user;

  return rowWrapper({
    identifier: user.id,
    children: [
      createElement({
        tag: 'div',
        attrs: { textContent: name },
      }),
      createElement({
        tag: 'div',
        attrs: { textContent: phone },
      }),
      rowActions({
        handlers,
        mode,
        onModifyClick,
        user,
      }),
    ],
  });
};

/** @param {RowUnitPayload} payload */
const editRow = (payload) => {
  const { user, handlers, onModifyClick, mode } = payload;

  const [localUser, updateLocalUser, _, getUser] = createState(user);

  const createChangeHandler = (field) => (e) => {
    updateLocalUser((user) => ({
      ...user,
      [field]: e.target.value,
    }));
  };

  const handleSave = () => {
    const user = getUser();
    const { valid, errors } = validateUser(user);
    if (valid) {
      onModifyClick(user);
      return;
    }
    Object.entries(errors).forEach(([, message]) => alert({ message }));
  };

  return rowWrapper({
    identifier: user.id,
    children: [
      Input({
        change: createChangeHandler('name'),
        value: localUser.name,
        placeholder: 'Имя',
      }),
      Input({
        change: createChangeHandler('phone'),
        value: localUser.phone,
        placeholder: 'Телефон',
      }),
      rowActions({
        handlers,
        mode,
        onModifyClick: handleSave,
      }),
    ],
  });
};

const GET_CREATOR_BY_MODE = {
  view: viewRow,
  edit: editRow,
};
