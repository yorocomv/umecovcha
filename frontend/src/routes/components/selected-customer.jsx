import { useEffect } from 'react';
import {
    VStack,
    HStack,
    Text,
} from '@chakra-ui/react';
import { axiosInst } from '../_axios-instance';

const SelectedCustomer = ({ customer }) => {

    useEffect(() => {
        const outputcsv = async () => {
            if (customer.id) {
                const res = (await axiosInst.post('/outputcsv', customer)).data;
                console.log(res);
            }
        };
        outputcsv();
    }, []);

    return (
        <VStack padding={4} >
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
        </VStack >
    );
};

export default SelectedCustomer;