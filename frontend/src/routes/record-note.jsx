import { useEffect, useState } from 'react';
import { Button, Container, FormControl, FormLabel, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import cs from '../addStyles.module.css';
import { useParams } from 'react-router-dom';
import ListOfNotes from './components/list-of-notes';
import { axiosInst } from './_axios-instance';
import { useForm } from 'react-hook-form';

const RecordNote = () => {
    const maxLength = 255;
    const [noteLength, setNoteLength] = useState(maxLength);
    const [customer, setCustomer] = useState({});
    const [notes, setNotes] = useState([]);

    const { id } = useParams();
    const useFormMethods = useForm();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting, errors },
    } = useFormMethods;

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
    const onSubmit = reg => console.log(reg);
    return (
        <VStack p={4}>
            <Text fontSize='lg'>{customer.name1}</Text>
            <Text fontSize='lg'>{customer.name2}</Text>
            {notes.length && <ListOfNotes notes={notes} />}
            <Container width='4xl' p={4} borderRadius={4} className={cs.lightSpot}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel htmlFor='serial_num'>表示順</FormLabel>
                    <Select width='24' defaultValue={notes.length + 1}>
                        {(() => {
                            const arr = [];
                            for (let i = 1; i <= notes.length; i++) {
                                arr.push(<option value={i} key={i}>{i}</option>);
                            }
                            return arr;
                        })()}
                        {/* 他の option とは別に出力しないと selected にならない */}
                        <option value={notes.length + 1}>{notes.length + 1}</option>
                    </Select>
                    <FormControl>
                        <FormLabel htmlFor='note'>留意事項！ (残り {noteLength} 文字)</FormLabel>
                        <Textarea
                            id='note'
                            {...register('note', {
                                required: '必須項目です',
                                maxLength: {
                                    value: maxLength,
                                    message: `登録可能最大文字数は ${maxLength} です`
                                }
                            })}
                            /* register よりあとに記述 */
                            onChange={handleChange}
                            autoFocus={true}
                            height='3xs' />
                            {errors.note && <Text color='red.500' mt='2' fontSize='sm' lineHeight='normal'>{errors.note.message}</Text>}
                    </FormControl>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>登録</Button>
                </form>
            </Container>
        </VStack>
    );
};

export default RecordNote;