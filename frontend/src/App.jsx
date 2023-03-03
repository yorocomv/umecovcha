import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchCustomer from './routes/search-customer';
import CheckCustomer from "./routes/check-customer";
import ListOfCustomers from './routes/list-of-customers';
import CreateCustomer from './routes/create-customer';
import RecordNote from './routes/record-note';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchCustomer />} />
        <Route path="/customers" element={<ListOfCustomers />} />
        <Route path="/customers/:id" element={<CheckCustomer />} />
        <Route path="/customers/new" element={<CreateCustomer />} />
        <Route path="/customers/:id/edit" element={<CreateCustomer />} />
        <Route path="recordnote/:id" element={<RecordNote />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
