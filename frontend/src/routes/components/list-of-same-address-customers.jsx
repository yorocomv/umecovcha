import {
    VStack,
    HStack,
    Text,
    Button,
    Flex,
    Stack,
    Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import cs from '../../addStyles.module.css';

const ListOfSameAddressCustomers = ({ sameAddressCustomers, customerId, setContinue, isContinue }) => {
    return (
        <>
            <Flex width="100%" position="sticky" top="0" align="center" justify="center" padding={2} bg="gray.700">
                <Button onClick={() => setContinue(isContinue)}>続ける</Button>
            </Flex>
            <VStack padding={4}>
                <Heading size='lg' margin={3}>もしかして、、🤔</Heading>
                {sameAddressCustomers.map((sameAddrCustomer) => (
                    <Link to={`/customers/${sameAddrCustomer.id}`} key={sameAddrCustomer.id}>
                        <HStack className={cs.fontWeightBold}>
                            {sameAddrCustomer.id === customerId && <Text fontWeight='bold' color='green.400'>✅ 選択中</Text>}
                            <Flex borderWidth='1px' borderColor='blackAlpha.500' borderRadius='md' padding={1}>
                                <Stack padding={[1, 2, 1, 1]} borderRightWidth='1px' borderColor='blackAlpha.500'>
                                    <Text>{sameAddrCustomer.invoice_id === 3 ? '😴 ' : ''}{sameAddrCustomer.name1}</Text>
                                    <Text>{sameAddrCustomer.name2}</Text>
                                </Stack>
                                <Stack padding={1}>
                                    <Text>{sameAddrCustomer.address1}</Text>
                                    <Text>{sameAddrCustomer.address2}</Text>
                                    <Text>{sameAddrCustomer.address3}</Text>
                                </Stack>
                            </Flex>
                        </HStack>
                    </Link>
                ))}
            </VStack>
        </>
    );
};

export default ListOfSameAddressCustomers;