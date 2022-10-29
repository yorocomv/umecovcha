import {
    VStack,
    HStack,
    Text,
} from '@chakra-ui/react';

const SelectedCustomer = ({ customer }) => {
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