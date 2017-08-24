const room = require('./room/room.service.js');
const message = require('./message/message.service.js');
const users = require('./users/users.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(room);
  app.configure(message);
  app.configure(users);
};
