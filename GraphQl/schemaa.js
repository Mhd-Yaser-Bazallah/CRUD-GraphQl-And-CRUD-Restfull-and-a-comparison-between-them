// Import your Mongoose models
const client = require('./modul/Client'); // Update this path accordingly
const project = require('./modul/Project'); // Update this path accordingly

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
  } = require('graphql');
  
   
  // Client Type
  const ClientType = new GraphQLObjectType({
    name: 'client',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      projects: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
          // Assuming your Client model has a projects field or method
          return project.find({ clientId: parent.id });
        },
      },
    }),
  });
  
  // Project Type
  const ProjectType = new GraphQLObjectType({
    name: 'project',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
      client: {
        type: ClientType,
        resolve(parent, args) {
          return client.findById(parent.clientId);
        },
      },
    }),
  });
  
  // RootQuery
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      // Get a client by ID
      clientById: {
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return client.findById(args.id);
        },
      },
      // Get all clients
      allclients: {
        type: new GraphQLList(ClientType),
        resolve(parent, args) {
          return client.find({});
        },
      },
      // Get a project by ID
      projectById: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return project.findById(args.id);
        },
      },
      // Get all projects
      allProjects: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
          return project.find({});
        },
      },
    },
  });
  
  // Mutations
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      // Add a client
      addClient: {
        type: ClientType,
        args: {
          name: { type:  (GraphQLString) },
          email: { type:  (GraphQLString) },
          phone: { type:  (GraphQLString) },
        },
        resolve(parent, args) {
          const Client = new client({
            name: args.name,
            email: args.email,
            phone: args.phone,
          });
  
          return Client.save();
        },
      },
      // Update a client
      updateClient: {
        type: ClientType,
        args: {
          id: { type:  (GraphQLID) },
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          phone: { type: GraphQLString },
        },
        resolve(parent, args) {
          return client.findByIdAndUpdate(
            args.id,
            { $set: args },
            { new: true }
          );
        },
      },
      // Delete a client
      deleteClient: {
        type: ClientType,
        args: {
          id: { type:  (GraphQLID) },
        },
        resolve(parent, args) {
          // Assuming you want to delete associated projects as well
          //project.deleteMany({ clientId: args.id }).exec();
          return client.findOneAndDelete(args.id);
        },
      }
    }
  });
  
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });
  