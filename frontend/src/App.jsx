import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListOfCustomers from './routes/list-of-customers';
import SearchCustomer from './routes/search-customer';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOfCustomers />} />
        <Route path="/search" element={<SearchCustomer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
