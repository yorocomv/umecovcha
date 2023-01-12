import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Input, Button, VStack, Text, Stack, Badge } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import cs from '../addStyles.module.css';

import { jaKousei } from '../lib/ja-kousei';
import { axiosInst } from './_axios-instance';

const SearchCustomer = () => {
    const [searchName, setSearchName] = useState(null);
    const [customers, setCustomers] = useState([]);
    const { register, handleSubmit } = useForm();

    const onSubmit = d => {
        const searchName = jaKousei(d.search_name, true);
        setSearchName(searchName);
    };

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const res = await axiosInst.get(`/?search-name=${searchName}`);
                setCustomers(res.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setCustomers([]);
                }
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
                    <Input
                        placeholder="スペース区切りのアンド検索、末尾に ：都道府県 or ：：市区町村 の絞り込み"
                        title="スペース区切りのアンド検索に加えて、末尾に&#10;：都道府県　or　：：市区町村 の絞り込み検索が可能です"
                        className={cs.fontWeightBold}
                        width="xl"
                        bg="white"
                        autoFocus={true}
                        {...register("search_name")}
                    />
                    <Button type="submit" marginLeft={1}>検索</Button>
                </form>
                <Link to={'customers/new'} target="_blank">
                    <Text fontWeight="bold" color="green.200" marginLeft={4}>新規登録</Text>
                </Link>
            </Flex>
            <VStack padding={4}>
                <Badge colorScheme={ customers.length ? 'green' : 'red' }>{`${customers.length} hit(s)`}</Badge>
                {customers.map((customer) => (
                    <Link key={customer.id} to={`customers/${customer.id}`} target="_blank">
                        <Flex className={cs.fontWeightBold} borderWidth='1px' borderColor='blackAlpha.500' borderRadius='md' padding={1}>
                            <Stack padding={[1, 2, 1, 1]} borderRightWidth='1px' borderColor='blackAlpha.500'>
                                <Text>{customer.invoice_id === 3 ? '😴 ' : ''}{customer.name1}</Text>
                                <Text>{customer.name2}</Text>
                            </Stack>
                            <Stack padding={1}>
                                <Text>{customer.address1}</Text>
                                <Text>{customer.address2}</Text>
                                <Text>{customer.address3}</Text>
                            </Stack>
                        </Flex>
                    </Link>
                ))}
            </VStack>
        </>
    );
};

export default SearchCustomer;
