import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';

const axiosInst = axios.create({
  baseURL: 'http://localhost:3001',
});

const ListOfCustomers = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axiosInst.get('/customers');
        setCustomers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCustomers();
  }, []);

  return (
    <VStack padding={4}>
      {customers.map((customer) => (
        <HStack key={customer.id}>
          <VStack>
            <Text>{customer.name1}</Text>
            <Text>{customer.name2}</Text>
          </VStack>
          <VStack>
            <Text>{customer.address1}</Text>
            <Text>{customer.address2}</Text>
            <Text>{customer.address3}</Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default ListOfCustomers;
