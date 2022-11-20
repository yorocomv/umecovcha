import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAddress } from '../lib/get-address';
import { localURI } from './_local-uri';
import { normalize, config } from '@geolonia/normalize-japanese-addresses';
import SHA1 from 'crypto-js/sha1';
import { jaKousei } from '../lib/ja-kousei';
import {
    VStack,
    Container,
    Button,
} from '@chakra-ui/react';
import { axiosInst } from './_axios-instance';
import CustomerInputs from './components/customer-inputs';
import cs from '../addStyles.module.css';

const yupSchema = yup.object().shape({
    tel: yup.string().trim().required('電話番号は必須項目です').matches(/^(104|[-0-9]{10,13})$/, '電話番号として適当ではありません'),
    zipCode: yup.string().trim().transform(
        val => val.replace(/-/g, '')
    ).required('郵便番号は必須項目です').matches(/^[0-9]{7}$/, '郵便番号として適当ではありません'),
    address1: yup.string().trim().max(32, '32文字まで入力できます').required('住所1は必須項目です'),
    address2: yup.string().trim().max(32, '32文字まで入力できます'),
    address3: yup.string().trim().max(32, '32文字まで入力できます'),
    name1: yup.string().trim().max(30, '30文字まで入力できます').required('名称1は必須項目です'),
    name2: yup.string().trim().max(30, '30文字まで入力できます'),
    alias: yup.string().trim().max(30, '30文字まで入力できます'),
});

/* '/jp/api/ja' では上手くいかない */
config.japaneseAddressesApi = `${localURI}/jp/api/ja`;

const CreateCustomer = () => {
    /* id が真値ならば編集モード */
    const { id } = useParams();
    const navigate = useNavigate();

    const useFormMethods = useForm({
        mode: 'all',
        resolver: yupResolver(yupSchema),
    });

    const {
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting },
    } = useFormMethods;

    const [invoices, setInvoices] = useState([]);
    const [resCustomerObj, setResCustomerObj] = useState({});

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await axiosInst.get('/invoices');
                setInvoices(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        const fetchCustomerObj = async () => {
            try {
                const res = await axiosInst.get(`/customers/${id}`);
                setResCustomerObj(res.data[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchInvoices();
        if (id) fetchCustomerObj();
    }, []);

    useEffect(() => {
        if (id) {
            setValue('tel', resCustomerObj.tel);
            setValue('zipCode', resCustomerObj.zip_code);
            setValue('address1', resCustomerObj.address1);
            setValue('address2', resCustomerObj.address2);
            setValue('address3', resCustomerObj.address3);
            setValue('name1', resCustomerObj.name1);
            setValue('name2', resCustomerObj.name2);
            setValue('alias', resCustomerObj.alias);
            setValue('invoiceId', resCustomerObj.invoice_id);
        } else {
            if (invoices.length !== 0) setValue('invoiceId', invoices[0]['id']);
        }
    }, [invoices, resCustomerObj]);

    /* https://github.com/react-hook-form/react-hook-form/discussions/2549 */
    const checkKeyDown = e => {
        if (e.key === 'Enter') e.preventDefault();
    };

    const onSubmit = async reg => {
        try {
            let address = reg.address1 + reg.address2 + reg.address3;
            address = getAddress(address);
            const normalObj = await normalize(address);
            const normalAddr = normalObj.pref + normalObj.city + normalObj.town + normalObj.addr;
            const addressSHA1 = SHA1(normalAddr).toString();
            let sha1SameVal = 0;
            const max = (await axiosInst.get(`/maxsha1sameval?address-sha1=${addressSHA1}`)).data;
            if (max !== null && max >= 0) sha1SameVal = max + 1;
            /* 編集モードで住所に変更がなければ既存の数値に書き戻し */
            if (id && resCustomerObj.address_sha1 === addressSHA1) {
                sha1SameVal = resCustomerObj.sha1_same_val;
            }
            let searchedName = reg.name1 + reg.name2 + reg.alias;
            searchedName = jaKousei(searchedName);
            const queryObj = { ...reg, ...normalObj, addressSHA1, sha1SameVal, searchedName };
            let res = {};
            if (id) {
                res = await axiosInst.put(`/customers/${id}`, queryObj);
            } else {
                res = await axiosInst.post('/customers', queryObj);
            }
            console.log(res.data);
            reset();
            navigate(`/customers/${res.data.id}?nowcreated=true`);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = () => {
        if (id) {
            const zipCode = resCustomerObj.zip_code;
            const invoiceId = resCustomerObj.invoice_id;
            reset({ ...resCustomerObj, zipCode, invoiceId });
        } else {
            reset();
            if (invoices.length !== 0) setValue('invoiceId', invoices[0]['id']);
        }
    };

    return (
        <VStack padding={4} className={cs.lightSpot}>
            <Container width='4xl'>
                <FormProvider {...useFormMethods}>
                    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={e => checkKeyDown(e)} autoComplete="off">
                        <CustomerInputs invoices={invoices} />

                        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                            { id ? '修正' : '登録' }
                        </Button>
                        <Button mt={4} colorScheme='orange' onClick={handleReset} marginLeft={1}>
                            { id ? 'リセット' : 'クリア' }
                        </Button>
                    </form>
                </FormProvider>
            </Container>
        </VStack>
    );
};

export default CreateCustomer;
