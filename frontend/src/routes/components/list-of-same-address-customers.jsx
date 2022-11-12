import {
    VStack,
    HStack,
    Text,
    Button,
    Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ListOfSameAddressCustomers = ({ sameAddressCustomers, customerId, setContinue, isContinue }) => {
    return (
        <>
            <Flex width="100%" position="sticky" top="0" align="center" justify="center" padding={2} bg="gray.700">
                <Button onClick={() => setContinue(isContinue)}>続ける</Button>
            </Flex>
            <VStack padding={4}>
                {sameAddressCustomers.map((sameAddrCustomer) => (
                    <Link to={`/customers/${sameAddrCustomer.id}`} key={sameAddrCustomer.id}>
                        <HStack>
                            {sameAddrCustomer.id === customerId && <Text>選択中</Text>}
                            <VStack>
                                <Text>{sameAddrCustomer.name1}</Text>
                                <Text>{sameAddrCustomer.name2}</Text>
                            </VStack>
                            <VStack>
                                <Text>{sameAddrCustomer.address1}</Text>
                                <Text>{sameAddrCustomer.address2}</Text>
                                <Text>{sameAddrCustomer.address3}</Text>
                            </VStack>
                        </HStack>
                    </Link>
                ))}
            </VStack>
        </>
    );
};

export default ListOfSameAddressCustomers;