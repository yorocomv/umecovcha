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
    const [noteArrayIndex, setNoteArrayIndex] = useState(NaN);
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
    const editingRanker = searchParams.get(('rank')) || '';

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
    }, [editingRanker]);

    useEffect(() => {
        if (!!editingRanker) {
            for (let i = 0; i < notes.length; i++) {
                if (editingRanker === `${notes[i]['rank']}`) {
                    // 配列の添字を記録して reset() などで利用する
                    setNoteArrayIndex(i);
                    setValue('rank', editingRanker);
                    setValue('note', notes[i]['body']);
                    setBodyLength(maxLength - notes[i]['body'].length);
                    setHasDeletable(false);
                }
            }
        } else {
            reset();
            if (notes.length !== 0) setValue('rank', notes.length + 1);
            setBodyLength(maxLength);
            setHasDeletable(false);
        }
    }, [notes, editingRanker]);

    const handleChangeTextarea = e => { setBodyLength(maxLength - e.target.value.length) };
    const handleChangeCheckbox = () => setHasDeletable(!hasDeletable);
    const onSubmit = async reg => {
        try {
            let res = {};
            if (!!editingRanker) {
                // 念のためもう一度 rank を現在値( 変更せず )で上書き
                reg.rank = editingRanker;
                res = await axiosInst.put(`/notes/${id}`, reg);
            } else {
                // 新規メモに対して表示順位が同じか大きい場合更新して場所を空ける
                // 配列全てをチェック、i を配列の添字にする( 表示順位より壱小さい )
                async function recuFunc(i) {
                    if (i < 0) return;

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
                    // 0 以上で再帰 及び 処理を中断して再帰を進めたか記録
                    let callMyself = i - 1;

                    if (!!newNumBool) {
                        const ranks = {
                            oldNum: currentNum,
                            newNum: newNumBool
                        };
                        if (ranks.oldNum !== ranks.newNum) {
                            // １つのノートの全てのカラムを返す API を叩く
                            // が、欲しいのは存在確認
                            const resNoteExist = await axiosInst.get(`/notes/${id}/ranks/${ranks.newNum}`);
                            if (resNoteExist.data.length) {
                                await recuFunc(callMyself);
                                callMyself = -1;
                            }
                            // １つのノートのランクを変更
                            const resNoteNum = await axiosInst.put(`/notes/${id}/ranks`, ranks);
                            console.log(resNoteNum.data);
                        }
                    }

                    if (callMyself >= 0) await recuFunc(callMyself);
                }
                await recuFunc(notes.length - 1);

                // １つのノートを新規登録
                res = await axiosInst.post(`/notes/${id}`, reg);
                // customers テーブルの対象レコードの総ノート数のカラムを更新
                const resCustomerNotes = await axiosInst.put(`/customers/${id}/notes/${notes.length + 1}`);
                console.log(resCustomerNotes.data);
            }
            console.log(res.data);
            reset();
            navigate(`/customers/${res.data.customer_id}?nowcreated=true`);
        } catch (err) {
            console.error(err);
        }
    };
    const handleReset = () => {
        if (!!editingRanker) {
            if (noteArrayIndex >= 0) {
                reset({
                    rank: notes[noteArrayIndex]['rank'],
                    note: notes[noteArrayIndex]['body']
                });
                setBodyLength(maxLength - notes[noteArrayIndex]['body'].length);
            }
        } else {
            reset();
            if (notes.length !== 0) setValue('rank', notes.length + 1);
            setBodyLength(maxLength);
        }
    };
    const handleDelete = async () => {
        try {
            const result = await axiosInst.delete(`/notes/${id}/ranks/${editingRanker}`);
            console.log(result);
            const resCustomerNotes = await axiosInst.put(`/customers/${id}/notes/${notes.length - 1}`);
            console.log(resCustomerNotes.data);
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
                        isDisabled={!!editingRanker}
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
                            onChange={handleChangeTextarea}
                            autoFocus={true}
                            height='3xs' />
                        {errors.note && <Text color='red.500' mt='2' fontSize='sm' lineHeight='normal'>{errors.note.message}</Text>}
                    </FormControl>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        {!!editingRanker ? '修正' : '登録'}
                    </Button>
                    <Button mt={4} colorScheme='orange' onClick={handleReset} marginLeft={1}>
                        {!!editingRanker ? 'リセット' : 'クリア'}
                    </Button>
                </form>
            </Container>
            {!!editingRanker ? (
                <HStack className={cs.deleteButton}>
                    <Button onClick={handleDelete} disabled={!hasDeletable}>編集中のメモを削除</Button>
                    <Checkbox onChange={handleChangeCheckbox} />
                </HStack>
            ) : null}
        </VStack>
    );
};

export default RecordNote;