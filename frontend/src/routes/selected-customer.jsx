import {
    VStack,
    HStack,
    Text,
} from '@chakra-ui/react';

const SelectedCustomer = (p) => {
    return (
        <VStack padding={4} >
            <HStack>
                <VStack>
                    <Text>{p.customer.name1}</Text>
                    <Text>{p.customer.name2}</Text>
                </VStack>
                <VStack>
                    <Text>{p.customer.address1}</Text>
                    <Text>{p.customer.address2}</Text>
                </VStack>
            </HStack>
        </VStack >
    );
};

export default SelectedCustomer;