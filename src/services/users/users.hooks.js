const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const isNotAdmin = hook => !hook.params.user || hook.params.user.role != 'admin';

const { hashPassword } = require('feathers-authentication-local').hooks;
const restrict = 
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  });

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt'), commonHooks.iff(isNotAdmin, [restrict]) ],
    create: [ hashPassword() ],
    update: [ commonHooks.iff(isNotAdmin, [restrict]), hashPassword() ],
    patch: [ authenticate('jwt'), commonHooks.iff(isNotAdmin, [restrict]), hashPassword() ],
    remove: [ authenticate('jwt'), commonHooks.iff(isNotAdmin, [restrict]) ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
