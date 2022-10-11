import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as selectList from './select-list';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', selectList.getCustomers);
app.get('/search', selectList.searchCustomer);

app.listen(port, () => console.log(`this app listening at http://localhost:${port}`));