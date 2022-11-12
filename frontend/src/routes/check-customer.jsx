import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SelectedCustomer from './components/selected-customer';
import ListOfSameAddressCustomers from './components/list-of-same-address-customers';
import { axiosInst } from './_axios-instance';

const CheckCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [sameAddressCustomers, setSameAddressCustomers] = useState([]);
  const [isContinue, setIsContinue] = useState(false);

  const { id } = useParams();
  const setContinue = bool => setIsContinue(!bool);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const resCustomer = await axiosInst.get(`/customers/${id}`);
        setCustomer(resCustomer.data[0]);
        const addrSha1 = resCustomer.data[0].address_sha1;
        const resSameAddressCustomers = await axiosInst.get(`/sameaddress?address-sha1=${addrSha1}`);
        setSameAddressCustomers(resSameAddressCustomers.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCustomer();
  }, [id]);

  if (sameAddressCustomers.length > 1 && isContinue === false) {
    return (<ListOfSameAddressCustomers
      sameAddressCustomers={sameAddressCustomers}
      customerId={customer.id}
      setContinue={setContinue}
      isContinue={isContinue}
    />);
  }
  return <SelectedCustomer customer={customer} />;
};

export default CheckCustomer;
