import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SelectedCustomer from './components/selected-customer';
import ListOfSameAddressCustomers from './components/list-of-same-address-customers';
import { axiosInst } from './_axios-instance';
import cs from '../addStyles.module.css';

const CheckCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [sameAddressCustomers, setSameAddressCustomers] = useState([]);
  const [isContinue, setIsContinue] = useState(false);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const setContinue = bool => setIsContinue(!bool);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const resCustomer = await axiosInst.get(`/customers/${id}`);
        setCustomer(resCustomer.data[0]);
        const addrSha1 = resCustomer.data[0].address_sha1;
        const resSameAddressCustomers = await axiosInst.get(`/sameaddress?address-sha1=${addrSha1}`);
        setSameAddressCustomers(resSameAddressCustomers.data);
        /* CreateCustomer から飛んできた時の目印を探す */
        if (searchParams.get('nowcreated') === 'true') {
          setIsContinue(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCustomer();
  }, [id]);

  if (!customer) {
    return (
      <div className={cs.warningText}>指定されたデータは登録されていません 🥵</div>
    );
  } else if (sameAddressCustomers.length > 1 && isContinue === false) {
    return (<ListOfSameAddressCustomers
      sameAddressCustomers={sameAddressCustomers}
      customerId={customer.id}
      setContinue={setContinue}
      isContinue={isContinue}
    />);
  }
  return (<SelectedCustomer
    customer={customer}
    sameAddressCustomersLength={sameAddressCustomers.length}
  />);
};

export default CheckCustomer;
