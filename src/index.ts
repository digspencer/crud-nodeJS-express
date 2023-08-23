// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import passwordRoutes from './server/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/passwords', passwordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
