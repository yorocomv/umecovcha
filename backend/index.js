import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as selectAny from './select-any';
import * as selectOne from './select-one';
import * as insert from './insert';
import * as io from './io';

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
app.get('/maxsha1sameval', selectOne.getMaxSha1SameVal);
app.get('/sameaddress', selectAny.getSameAddress);
app.get('/customers', selectAny.getCustomers);
app.get('/customers/:id', selectOne.getCustomerById);
app.get('/invoices', selectAny.getInvoices);

app.post('/customers', insert.createCustomer);
app.post('/outputcsv', io.writeOutDetailsCustomer);

app.listen(port, () => console.log(`this app listening at http://localhost:${port}`));
