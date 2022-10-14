import { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, HStack, Input, Button, VStack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const axiosInst = axios.create({
    baseURL: 'http://localhost:3001',
});

const SearchCustomer = () => {
    const [searchName, setsearchName] = useState(null);
    const [customers, setCustomers] = useState([]);
    const { register, handleSubmit } = useForm();

    const onSubmit = d => setsearchName(d.search_name);

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const res = await axiosInst.get(`/search?name=${searchName}`);
                setCustomers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getCustomers();
    }, [searchName]);

    return (
        <>
            <Flex width="100%" align="center" justify="center" padding="3px" bg="gray.700">
                <HStack>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input bg="white" {...register("search_name")} />
                        <Button type="submit">検索</Button>
                    </form>
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