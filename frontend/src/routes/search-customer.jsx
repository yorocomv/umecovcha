import { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, HStack, Input, Button, VStack, Text } from '@chakra-ui/react';

const axiosInst = axios.create({
    baseURL: 'http://localhost:3001',
});

const SearchCustomer = () => {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        const getCustomers = async () => {
            try {
                const res = await axiosInst.get('/search?name=伊藤忠食品');
                setCustomers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getCustomers();
    }, []);

    return (
        <>
            <Flex width="100%" align="center" justify="center" padding="3px" bg="gray.700">
                <HStack>
                    <Input bg="white" />
                    <Button>検索</Button>
                </HStack>
            </Flex>
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
                        </VStack>
                    </HStack>
                ))}
            </VStack>
        </>
    );
};

export default SearchCustomer;