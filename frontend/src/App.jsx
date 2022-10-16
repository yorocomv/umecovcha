import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListOfCustomers from './routes/list-of-customers';
import SearchCustomer from './routes/search-customer';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchCustomer />} />
        <Route path="/view" element={<ListOfCustomers />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
