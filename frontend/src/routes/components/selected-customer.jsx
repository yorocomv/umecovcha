import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    VStack,
    Flex,
    Stack,
    Text,
    Button,
    Checkbox,
    HStack,
} from '@chakra-ui/react';
import { axiosInst } from '../_axios-instance';
import cs from '../../addStyles.module.css';

const SelectedCustomer = ({ customer, sameAddressCustomersLength }) => {
    const navigate = useNavigate();

    const [hasDeletable, setHasDeletable] = useState(false);

    useEffect(() => {
        const outputcsv = async () => {
            if (customer.id) {
                const res = (await axiosInst.post('/outputcsv', customer)).data;
                console.log(res);
            }
        };
        outputcsv();
    }, [sameAddressCustomersLength]);

    const handleChange = () => setHasDeletable(!hasDeletable);
    const handleDelete = async () => {
        try {
            const result = await axiosInst.delete(`/customers/${customer.id}`);
            console.log(result);
            navigate('/customers/new');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Flex width="100%" position="sticky" top="0" align="center" justify="center" padding={2} bg="gray.700">
                <Link to={`/customers/${customer.id}/edit`}>
                    <Text fontWeight='bold' color='orange.400' marginLeft={4}>編集</Text>
                </Link>
            </Flex>
            <VStack padding={4} >
                <Stack className={cs.fontWeightBold} padding={1}>
                    <Flex>
                        <Text>☎ </Text>
                        <Text>{customer.tel}</Text>
                    </Flex>
                    <Flex>
                        <Text>〠 </Text>
                        <Text>{customer.zip_code}</Text>
                        <Stack padding={1}>
                            <Text>{customer.address1}</Text>
                            <Text>{customer.address2}</Text>
                            <Text>{customer.address3}</Text>
                        </Stack>
                    </Flex>
                    <Text>{customer.name1}</Text>
                    <Text>{customer.name2}</Text>
                </Stack>
            </VStack >
            <HStack className={cs.deleteButton}>
                <Button onClick={handleDelete} disabled={!hasDeletable}>このレコードを削除</Button>
                <Checkbox onChange={handleChange} />
            </HStack>
        </>
    );
};

export default SelectedCustomer;