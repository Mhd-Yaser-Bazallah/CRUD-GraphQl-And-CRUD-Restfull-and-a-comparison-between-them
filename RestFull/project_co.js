const Project = require('./modul/Project');
const factory = require('./controler');
const catchAsync = require('./catchAsync');
const AppError = require('./appError');


exports.getAllProject = factory.getAll(Project);
exports.getProject = factory.getOne(Project);
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);