import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema.js';
import { root } from './resolvers.js';

const app = express();

app.all('/graphql', createHandler({
  schema,
  rootValue: root
}));

app.listen(4000, () => {
  console.log('🚀 Server chạy tại http://localhost:4000');
});
