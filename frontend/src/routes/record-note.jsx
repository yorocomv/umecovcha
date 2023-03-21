import { useEffect, useState } from 'react';
import { Button, Container, FormControl, FormLabel, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import cs from '../addStyles.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import ListOfNotes from './components/list-of-notes';
import { axiosInst } from './_axios-instance';
import { useForm } from 'react-hook-form';

const RecordNote = () => {
    const maxLength = 255;
    const [bodyLength, setBodyLength] = useState(maxLength);
    const [customer, setCustomer] = useState({});
    const [notes, setNotes] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();
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

    useEffect(() => {
        if (notes.length !== 0) setValue('serialNum', notes.length + 1);
    }, [notes]);

    const handleChange = e => { setBodyLength(maxLength - e.target.value.length) };
    const onSubmit = async reg => {
        try {
            const res = await axiosInst.post(`/notes/${id}`, reg);
            console.log(res.data);
            reset();
            navigate(`/customers/${res.data.customer_id}?nowcreated=true`);
        } catch (err) {
            console.error(err);
        }
    };
    const handleReset = () => {
        reset();
        if (notes.length !== 0) setValue('serialNum', notes.length + 1);
    };
    return (
        <VStack p={4}>
            <Text fontSize='lg'>{customer.name1}</Text>
            <Text fontSize='lg'>{customer.name2}</Text>
            {notes.length && <ListOfNotes notes={notes} />}
            <Container width='4xl' p={4} borderRadius={4} className={cs.lightSpot}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel htmlFor='serial_num'>表示順</FormLabel>
                    <Select
                        id='serial_num'
                        {...register('serialNum')}
                        width='24'
                    >
                        {(() => {
                            const arr = [];
                            for (let i = 1; i <= notes.length + 1; i++) {
                                arr.push(<option value={i} key={i}>{i}</option>);
                            }
                            return arr;
                        })()}
                    </Select>
                    <FormControl>
                        <FormLabel htmlFor='note'>留意事項！ (残り {bodyLength} 文字)</FormLabel>
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
                    <Button mt={4} colorScheme='orange' onClick={handleReset} marginLeft={1}>クリア</Button>
                </form>
            </Container>
        </VStack>
    );
};

export default RecordNote;