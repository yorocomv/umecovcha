import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Flex, HStack, Input, Button, VStack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import cs from '../addStyles.module.css';

import { jaKousei } from '../lib/ja-kousei';

const axiosInst = axios.create({
    baseURL: 'http://localhost:3001',
});

const SearchCustomer = () => {
    const [searchName, setSearchName] = useState(null);
    const [customers, setCustomers] = useState([]);
    const { register, handleSubmit } = useForm();

    const onSubmit = d => {
        const searchName = jaKousei(d.search_name);
        setSearchName(searchName);
    };

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const res = await axiosInst.get(`/?search-name=${searchName}`);
                setCustomers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (!searchName) return;
        getCustomers();
    }, [searchName]);

    return (
        <>
            <Flex width="100%" position="sticky" top="0" align="center" justify="center" padding={2} bg="gray.700">
                <form className={cs.flexForm} onSubmit={handleSubmit(onSubmit)}>
                    <Input width="auto" bg="white" {...register("search_name")} />
                    <Button type="submit">検索</Button>
                </form>
                <Link to={'customers/new'}>
                    <Text color="orange.50" paddingLeft={4}>新規登録</Text>
                </Link>
            </Flex>
            <VStack padding={4}>
                {customers.map((customer) => (
                    <Link key={customer.id} to={`customers/${customer.id}`} target="_blank">
                        <HStack>
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
                    </Link>
                ))}
            </VStack>
        </>
    );
};

export default SearchCustomer;