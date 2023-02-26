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
    List,
    ListItem,
    ListIcon,
    Divider,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { axiosInst } from '../_axios-instance';
import cs from '../../addStyles.module.css';

const SelectedCustomer = ({ customer, sameAddressCustomersLength, notes }) => {
    const navigate = useNavigate();

    const [hasDeletable, setHasDeletable] = useState(false);

    let zip_code_hyphen = customer.zip_code;
    if (/^[0-9]{7}$/.test(zip_code_hyphen)) {
        zip_code_hyphen = zip_code_hyphen.slice(0, 3) + '-' + zip_code_hyphen.slice(3);
    }

    useEffect(() => {
        const outputfile = async () => {
            if (customer.id) {
                const customer_plus_additional = { ...customer, zip_code_hyphen };
                const res = (await axiosInst.post('/outputfile', customer_plus_additional)).data;
                console.log(res);
            }
        };
        outputfile();
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
            <VStack padding={4} className={cs.reppStripe} >
                <Stack className={cs.fontWeightBold} padding={1}>
                    <Flex>
                        <Text paddingRight={1}>☎</Text>
                        <Text>{customer.tel}</Text>
                    </Flex>
                    <Flex>
                        <Text paddingRight={1}>〠</Text>
                        <Text>{zip_code_hyphen}</Text>
                    </Flex>
                    <Text>{customer.address1}</Text>
                    <Text>{customer.address2}</Text>
                    <Text>{customer.address3}</Text>
                    <Text fontSize='2xl' as="mark">{customer.invoice_id === 3 ? '😴 ' : ''}{customer.name1}</Text>
                    <Text fontSize='2xl'>{customer.name2}</Text>
                    {notes.length && <>
                        <Divider borderColor='darkgoldenrod' paddingTop={3} />
                        <List spacing={3}>
                            {notes.map((note) => (
                                <ListItem color='darkred' boxShadow='xs' key={note.serial_number}>
                                    <ListIcon as={BellIcon} color='darkgoldenrod' />
                                    {note.body}
                                </ListItem>
                            ))}
                        </List>
                    </>}
                </Stack>
            </VStack>
            <HStack className={cs.deleteButton}>
                <Button onClick={handleDelete} disabled={!hasDeletable}>このレコードを削除</Button>
                <Checkbox onChange={handleChange} />
            </HStack>
        </>
    );
};

export default SelectedCustomer;