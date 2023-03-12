import { useEffect, useState } from 'react';
import { Container, FormControl, FormLabel, Text, Textarea, VStack } from '@chakra-ui/react';
import cs from '../addStyles.module.css';
import { useParams } from 'react-router-dom';
import ListOfNotes from './components/list-of-notes';
import { axiosInst } from './_axios-instance';

const RecordNote = () => {
    const maxLength = 255;
    const [noteLength, setNoteLength] = useState(maxLength);
    const [customer, setCustomer] = useState({});
    const [notes, setNotes] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const resCustomer = await axiosInst.get(`/customers/${id}`);
                setCustomer(resCustomer.data[0]);
                const resNotes = await axiosInst.get(`/notes/${id}`);
                setNotes(resNotes.data);
            } catch (err) {
                console.error(err);
            }
        };
        getCustomer();
    }, []);

    const handleChange = e => { setNoteLength(maxLength - e.target.value.length) };
    return (
        <VStack p={4}>
            <Text fontSize='lg'>{customer.name1}</Text>
            <Text fontSize='lg'>{customer.name2}</Text>
            {notes.length && <ListOfNotes notes={notes} />}
            <Container width='4xl' p={4} borderRadius={4} className={cs.lightSpot}>
                <form>
                    <FormControl>
                        <FormLabel htmlFor='note'>留意事項！ (残り {noteLength} 文字)</FormLabel>
                        <Textarea onChange={handleChange} id='note' autoFocus={true} height='3xs' />
                    </FormControl>
                </form>
            </Container>
        </VStack>
    );
};

export default RecordNote;