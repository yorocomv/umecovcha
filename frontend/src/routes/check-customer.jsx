import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';

const axiosInst = axios.create({
  baseURL: 'http://localhost:3001',
});

const CheckCustomer = () => {
  const [customer, setCustomer] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const res = await axiosInst.get(`/customer/${id}`);
        setCustomer(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getCustomer();
  }, []);

  return (
    <VStack padding={4}>
      <HStack>
        <VStack>
          <Text>{customer.name1}</Text>
          <Text>{customer.name2}</Text>
        </VStack>
        <VStack>
          <Text>{customer.address1}</Text>
          <Text>{customer.address2}</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default CheckCustomer;
