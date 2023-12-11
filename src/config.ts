import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: { 
      dbName: process.env.MONGO_DB,
      dbUri: 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT',
    },
  };
});;