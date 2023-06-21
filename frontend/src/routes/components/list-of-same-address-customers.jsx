import {
    VStack,
    HStack,
    Text,
    Button,
    Flex,
    Stack,
    Heading,
    Container,
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
                        <HStack className={cs.fontWeightBold} marginTop='1.4rem'>
                            {sameAddrCustomer.id === customerId && <Text fontWeight='bold' color='green.400'>✅ 選択中</Text>}
                            <VStack
                                backgroundColor='#E1D7C9'
                                borderWidth='1px'
                                borderColor='whiteAlpha.500'
                                borderRadius='md'
                                padding={1}
                                _hover={{ backgroundColor: '#E7DED3' }}
                            >
                                <Flex>
                                    <Stack pr='3' borderRightWidth='1px' borderColor='#B8B0A4' boxShadow='4px 0 3px -3px #CDC3B7'>
                                        <Text>{sameAddrCustomer.name1}</Text>
                                        {sameAddrCustomer.name2 ? <Text>{sameAddrCustomer.name2}</Text> : null}
                                        <Text>☎ {sameAddrCustomer.tel}</Text>
                                    </Stack>
                                    <Stack pl='3'>
                                        <Text>{sameAddrCustomer.address1}</Text>
                                        {sameAddrCustomer.address2 ? <Text>{sameAddrCustomer.address2}</Text> : null}
                                        {sameAddrCustomer.address3 ? <Text>{sameAddrCustomer.address3}</Text> : null}
                                    </Stack>
                                </Flex>
                                <Container className={cs.viewStatus}>
                                    {sameAddrCustomer.invoice_id === 3 ? '😩' : ''}
                                    {sameAddrCustomer.notes !== 0 ? '📝' : ''}
                                </Container>
                            </VStack>

                        </HStack>
                    </Link>
                ))}
            </VStack>
        </>
    );
};

export default ListOfSameAddressCustomers;