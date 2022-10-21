import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';
import SelectedCustomer from './selected-customer';

const axiosInst = axios.create({
  baseURL: 'http://localhost:3001',
});

const CheckCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [sameAddressCustomers, setSameAddressCustomers] = useState([]);
  const [isContinue, setIsContinue] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const resCustomer = await axiosInst.get(`/customer/${id}`);
        setCustomer(resCustomer.data[0]);
        const addrSha1 = resCustomer.data[0].address_sha1;
        const resSameAddressCustomers = await axiosInst.get(`/sameaddress?address-sha1=${addrSha1}`);
        setSameAddressCustomers(resSameAddressCustomers.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCustomer();
  }, []);

  if (sameAddressCustomers.length > 1) {
    console.log(sameAddressCustomers); console.log(customer.name1);
    return (
      <VStack padding={4}>
        {sameAddressCustomers.map((sameAddrCustomer) => (
          <HStack key={sameAddrCustomer.id}>
            {sameAddrCustomer.id === customer.id && <Text>選択中</Text>}
            <VStack>
              <Text>{sameAddrCustomer.name1}</Text>
              <Text>{sameAddrCustomer.name2}</Text>
            </VStack>
            <VStack>
              <Text>{sameAddrCustomer.address1}</Text>
              <Text>{sameAddrCustomer.address2}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    );
  }
  return <SelectedCustomer customer={customer} />;
};

export default CheckCustomer;
