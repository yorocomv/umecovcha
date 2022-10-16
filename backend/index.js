import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as selectAny from './select-any';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', selectAny.searchCustomer);
app.get('/view', selectAny.getCustomers);

app.listen(port, () => console.log(`this app listening at http://localhost:${port}`));