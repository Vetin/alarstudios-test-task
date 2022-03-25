import { createElement } from '../../libs/create-element.js';
import { createState } from '../../libs/create-state.js';
import { replaceNode } from '../../libs/replace-node.js';

/** @typedef {import('../../api/index').User} User */

/** @typedef {{'view' | 'edit'}} ViewMode */

/** @typedef  {{updateUser: (payload: {id: string, name: string, phone: string}) => Promise<{}>, deleteUser: (payload: {id: string}) => Promise<void>}} renderUsersTableHanders */

/** @typedef {{user:User, handlers: renderUsersTableHanders, onModifyClick: () => void, mode: ViewMode }} RowUnitPayload  */

/** @param {ViewMode} mode */
const inverseMode = (mode) => (mode === 'view' ? 'edit' : 'view');

/**
 * @param {{users: User[], handlers: renderUsersTableHandlers}} payload
 */
export const usersTable = (payload) => {
  const { users, handlers } = payload;
  const result = createElement({
    tag: 'div',
    attrs: {
      className: 'users-table',
    },
  });

  const changeMode = (payload) => {
    const { mode, user } = payload;
    console.log(user);
    const payloadMode = inverseMode(mode);
    const updatedNode = GET_CREATOR_BY_MODE[mode]({
      user,
      handlers,
      onModifyClick: (user) => changeMode({ user, mode: payloadMode }),
      mode,
    });

    replaceNode(user.id, updatedNode);
  };

  const header = tableHeader();
  const usersRows = users.map((user) => [
    user.id,
    GET_CREATOR_BY_MODE['view']({
      handlers,
      onModifyClick: (user) => changeMode({ user, mode: inverseMode('view') }),
      user,
      mode: 'view',
    }),
  ]);
  // sync initial render

  result.append(header, ...usersRows.map(([_, node]) => node));

  return result;
};

const tableHeader = () => {
  return createElement({
    tag: 'fragment',
    children: [
      createElement({
        tag: 'div',
        attrs: {
          textContent: 'Имя:',
        },
      }),
      createElement({
        tag: 'div',
        attrs: {
          textContent: 'Телефон:',
        },
      }),
      createElement({
        tag: 'div',
        attrs: {
          textContent: 'Действия',
        },
      }),
    ],
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
    key: identifier,
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

  const [localUser, updateLocalUser] = createState(user);

  const createChangeHandler = (field) => (e) => {
    updateLocalUser((user) => ({
      ...user,
      [field]: e.target.value,
    }));
  };

  return rowWrapper({
    identifier: user.id,
    children: [
      createElement({
        tag: 'input',
        attrs: {
          value: localUser.name,
        },
        handlers: [
          {
            type: 'change',
            fn: createChangeHandler('name'),
          },
        ],
      }),
      createElement({
        tag: 'input',
        attrs: {
          value: localUser.phone,
        },
        handlers: [
          {
            type: 'change',
            fn: createChangeHandler('phone'),
          },
        ],
      }),
      rowActions({
        handlers,
        mode,
        onModifyClick: () => {
          onModifyClick(user);
        },
      }),
    ],
  });
};

const GET_CREATOR_BY_MODE = {
  view: viewRow,
  edit: editRow,
};
