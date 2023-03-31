import { useEffect, useState } from 'react';
import { Button, Checkbox, Container, FormControl, FormLabel, HStack, Select, Text, Textarea, VStack } from '@chakra-ui/react';
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
    const [hasDeletable, setHasDeletable] = useState(false);

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
    const editRanker = searchParams.get(('rank')) || '';

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
    }, [editRanker]);

    useEffect(() => {
        if (!!editRanker) {
            for (let i = 0; i < notes.length; i++) {
                if (editRanker === `${notes[i]['rank']}`) {
                    // 配列の添字を記録して reset() などで利用する
                    setSubscriptsArrayNotes(i);
                    setValue('rank', editRanker);
                    setValue('note', notes[i]['body']);
                    setBodyLength(maxLength - notes[i]['body'].length);
                }
            }
        } else {
            reset();
            if (notes.length !== 0) setValue('rank', notes.length + 1);
            setBodyLength(maxLength);
        }
    }, [notes, editRanker]);

    const handleChange = e => { setBodyLength(maxLength - e.target.value.length) };
    const handleChangeCheckbox = () => setHasDeletable(!hasDeletable);
    const onSubmit = async reg => {
        try {
            let res = {};
            if (!!editRanker) {
                res = await axiosInst.put(`/notes/${id}`, reg);
            } else {
                // 新規メモに対して表示順位が同じか大きい場合更新して場所を空ける
                // 配列全てをチェック、i を配列の添字にする( 表示順位より壱小さい )
                for (let i = notes.length - 1; i >= 0; i--) {

                    // 現状の表示順位
                    const currentNum = notes[i]['rank'];
                    // あるべき表示順位
                    const idealNum = i + 1;
                    // 真偽値を兼ねた新しい表示順位
                    let newNumBool = 0;

                    if (currentNum !== idealNum) {
                        newNumBool = idealNum;
                    }
                    if (idealNum >= reg.rank) {
                        newNumBool = idealNum + 1;
                    }

                    if (!!newNumBool) {
                        const ranks = {
                            oldNum: currentNum,
                            newNum: newNumBool
                        };
                        const resNoteNum = await axiosInst.put(`/notes/${id}/ranks`, ranks);
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
        if (!!editRanker) {
            if (subscriptsArrayNotes >= 0) {
                reset({
                    rank: notes[subscriptsArrayNotes]['rank'],
                    note: notes[subscriptsArrayNotes]['body']
                });
                setBodyLength(maxLength - notes[subscriptsArrayNotes]['body'].length);
            }
        } else {
            reset();
            if (notes.length !== 0) setValue('rank', notes.length + 1);
            setBodyLength(maxLength);
        }
    };
    const handleDelete = async () => {
        try {
            const result = await axiosInst.delete(`/notes/${id}/ranks/${editRanker}`);
            console.log(result);
            navigate(`/recordnote/${id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <VStack p={4}>
            <Text fontSize='lg'>{customer.name1}</Text>
            <Text fontSize='lg'>{customer.name2}</Text>
            {notes.length && <ListOfNotes customerId={id} notes={notes} />}
            <Container width='4xl' p={4} borderRadius={4} className={cs.lightSpot}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormLabel htmlFor='rank'>表示順</FormLabel>
                    <Select
                        id='rank'
                        {...register('rank')}
                        isDisabled={!!editRanker}
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
                        {!!editRanker ? '修正' : '登録'}
                    </Button>
                    <Button mt={4} colorScheme='orange' onClick={handleReset} marginLeft={1}>
                        {!!editRanker ? 'リセット' : 'クリア'}
                    </Button>
                </form>
            </Container>
            {!!editRanker ? (
                <HStack className={cs.deleteButton}>
                    <Button onClick={handleDelete} disabled={!hasDeletable}>編集中のメモを削除</Button>
                    <Checkbox onChange={handleChangeCheckbox} />
                </HStack>
            ) : null}
        </VStack>
    );
};

export default RecordNote;