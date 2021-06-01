import { ObjectID, Db } from 'mongodb';
import { Fn } from './types';

const me: Fn = (_, args, { currentUser }) => currentUser;

const totalPhotos: Fn = (_, arg, { db }) =>
  db.collection('photos').estimatedDocumentCount();

const allPhotos: Fn = (parent, args, { db }) =>
  db.collection('photos').estimatedDocumentCount();

const Photo: Fn = (parent, args, { db }) =>
  db.collection('photos').findOne({ _id: new ObjectID(args.id) });

const totalUsers: Fn = (parent, args, { db }) =>
  db.collection('users').estimatedDocumentCount();

const allUsers: Fn = (parent, args, { db }) =>
  db.collection('users').find().toArray();

const User: Fn = (parent, args, { db }) =>
  db.collection('users').findOne({ githubLogin: args.login });

export default {
  me,
  totalPhotos,
  allPhotos,
  Photo,
  totalUsers,
  allUsers,
  User,
};
