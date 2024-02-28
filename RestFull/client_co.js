const Client = require('./modul/Client');
const factory = require('./controler');
const catchAsync = require('./catchAsync');
const AppError = require('./appError');


exports.getAllClient = factory.getAll(Client);
exports.getClient = factory.getOne(Client);
exports.createClient = factory.createOne(Client);
exports.updateClient = factory.updateOne(Client);
exports.deleteClient = factory.deleteOne(Client);