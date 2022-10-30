import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as selectAny from './select-any';
import * as selectOne from './select-one';
import * as insert from './insert';

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
app.get('/sameaddress', selectAny.getSameAddress);
app.get('/customers', selectAny.getCustomers);
app.get('/customers/:id', selectOne.getCustomerById);

app.post('/customers', insert.createCustomer);

app.listen(port, () => console.log(`this app listening at http://localhost:${port}`));
