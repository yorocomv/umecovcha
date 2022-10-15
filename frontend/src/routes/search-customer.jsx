import { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, HStack, Input, Button, VStack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import cs from '../addStyles.module.css';

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
            <Flex width="100%" position="sticky" top="0" align="center" justify="center" padding={2} bg="gray.700">
                    <form className={cs.flexForm} onSubmit={handleSubmit(onSubmit)}>
                        <Input width="auto" bg="white" {...register("search_name")} />
                        <Button type="submit">検索</Button>
                    </form>
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