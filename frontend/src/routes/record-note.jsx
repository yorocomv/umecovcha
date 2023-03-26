import { useEffect, useState } from 'react';
import { Button, Container, FormControl, FormLabel, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import cs from '../addStyles.module.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ListOfNotes from './components/list-of-notes';
import { axiosInst } from './_axios-instance';
import { useForm } from 'react-hook-form';

const RecordNote = () => {
    const maxLength = 255;
    const [bodyLength, setBodyLength] = useState(maxLength);
    const [customer, setCustomer] = useState({});
    const [notes, setNotes] = useState([]);
    const [subscriptsArrayNotes, setSubscriptsArrayNotes] = useState(NaN);

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const useFormMethods = useForm();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting, errors },
    } = useFormMethods;
    const serialNumberEditing = searchParams.get(('serialnumber')) || '';

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
        if (!!serialNumberEditing) {
            for (let i = 0; i < notes.length; i++) {
                if (serialNumberEditing === `${notes[i]['serial_number']}`) {
                    // 配列の添字を記録して reset() などで利用する
                    setSubscriptsArrayNotes(i);
                    setValue('serialNum', serialNumberEditing);
                    setValue('note', notes[i]['body']);
                    setBodyLength(maxLength - notes[i]['body'].length);
                }
            }
        } else {
            if (notes.length !== 0) setValue('serialNum', notes.length + 1);
        }
    }, [notes, serialNumberEditing]);

    const handleChange = e => { setBodyLength(maxLength - e.target.value.length) };
    const onSubmit = async reg => {
        try {
            let res = {};
            if (!!serialNumberEditing) {
                res = await axiosInst.put(`/notes/${id}`, reg);
            } else {
                // 新規メモに対して連番が同じか大きい場合更新して場所を空ける
                // 配列全てをチェック、i を配列の添字にする( 連番より壱小さい )
                for (let i = notes.length - 1; i >= 0; i--) {

                    // 現状の連番
                    const currentSNum = notes[i]['serial_number'];
                    // あるべき連番
                    const idealSNum = i + 1;
                    // 真偽値を兼ねた新しい連番
                    let newSerialNumber = 0;

                    if (currentSNum !== idealSNum) {
                        newSerialNumber = idealSNum;
                    }
                    if (idealSNum >= reg.serialNum) {
                        newSerialNumber = idealSNum + 1;
                    }

                    if (!!newSerialNumber) {
                        const serialNumbers = {
                            oldNum: currentSNum,
                            newNum: newSerialNumber
                        };
                        const resNoteNum = await axiosInst.put(`/snumbernote/${id}`, serialNumbers);
                        console.log(resNoteNum.data);
                    }
                }
                res = await axiosInst.post(`/notes/${id}`, reg);
            }
            console.log(res.data);
            reset();
            navigate(`/customers/${res.data.customer_id}?nowcreated=true`);
        } catch (err) {
            console.error(err);
        }
    };
    const handleReset = () => {
        if (!!serialNumberEditing) {
            if (subscriptsArrayNotes >= 0) {
                reset({
                    serialNum: notes[subscriptsArrayNotes]['serial_number'],
                    note: notes[subscriptsArrayNotes]['body']
                });
                setBodyLength(maxLength - notes[subscriptsArrayNotes]['body'].length);
            }
        } else {
            reset();
            if (notes.length !== 0) setValue('serialNum', notes.length + 1);
            setBodyLength(maxLength);
        }
    };
    return (
        <VStack p={4}>
            <Text fontSize='lg'>{customer.name1}</Text>
            <Text fontSize='lg'>{customer.name2}</Text>
            {notes.length && <ListOfNotes customerId={id} notes={notes} />}
            <Container width='4xl' p={4} borderRadius={4} className={cs.lightSpot}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel htmlFor='serial_num'>表示順</FormLabel>
                    <Select
                        id='serial_num'
                        {...register('serialNum')}
                        isDisabled={!!serialNumberEditing}
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
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        {!!serialNumberEditing ? '修正' : '登録'}
                    </Button>
                    <Button mt={4} colorScheme='orange' onClick={handleReset} marginLeft={1}>
                        {!!serialNumberEditing ? 'リセット' : 'クリア'}
                    </Button>
                </form>
            </Container>
        </VStack>
    );
};

export default RecordNote;