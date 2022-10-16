import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchCustomer from './routes/search-customer';
import CheckCustomer from "./routes/check-customer";
import ListOfCustomers from './routes/list-of-customers';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchCustomer />} />
        <Route path="/customer" element={<CheckCustomer />}>
          <Route path=":id" element={<CheckCustomer />} />
        </Route>
        <Route path="/view" element={<ListOfCustomers />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
