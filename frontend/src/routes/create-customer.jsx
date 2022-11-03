import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAddress } from '../lib/get-address';
import { localURI } from './local-uri';
import { normalize, config } from '@geolonia/normalize-japanese-addresses';
import {
    VStack,
    Container,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react';
import { axiosInst } from './axios-instance';

const yupSchema = yup.object().shape({
    tel: yup.string().trim().required('電話番号は必須項目です').matches(/^(104|[-0-9]{10,13})$/, '電話番号として適当ではありません'),
    zip_code: yup.string().trim().required('郵便番号は必須項目です').matches(/^[-0-9]{7,8}$/, '郵便番号として適当ではありません'),
    address1: yup.string().trim().max(32, '32文字まで入力できます').required('住所1は必須項目です'),
    address2: yup.string().trim().max(32, '32文字まで入力できます'),
    address3: yup.string().trim().max(32, '32文字まで入力できます'),
    name1: yup.string().trim().max(30, '30文字まで入力できます').required('名称1は必須項目です'),
    name2: yup.string().trim().max(30, '30文字まで入力できます'),
    alias: yup.string().trim().max(30, '30文字まで入力できます'),
});

/* '/jp/api/ja' では上手くいかない */
config.japaneseAddressesApi = `http://${localURI}/jp/api/ja`;

const CreateCustomer = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'all',
        resolver: yupResolver(yupSchema),
    });

    const onSubmit = async reg => {
        try {
            let address = reg.address1 + reg.address2 + reg.address3;
            address = getAddress(address);
            const normalObj = await normalize(address);
            const queryObj = { ...reg, ...normalObj };
            const res = await axiosInst.post('/customers', queryObj);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <VStack padding={4}>
            <Container width='4xl'>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <FormControl isInvalid={errors.tel}>{/* ----- ヒトマトマリ ----- */}
                        <FormLabel htmlFor='tel'>電話番号</FormLabel>
                        <Input
                            id='tel'
                            placeholder='電話番号'
                            {...register('tel')}
                            width='2xs'
                        />
                        <FormErrorMessage>
                            {errors.tel && errors.tel.message}
                        </FormErrorMessage>
                    </FormControl>{/* ===== ココマデ ===== */}

                    <FormControl isInvalid={errors.zip_code}>{/* ----- ヒトマトマリ ----- */}
                        <FormLabel htmlFor='zip_code'>郵便番号</FormLabel>
                        <Input
                            id='zip_code'
                            placeholder='郵便番号'
                            {...register('zip_code')}
                            width='2xs'
                        />
                        <FormErrorMessage>
                            {errors.zip_code && errors.zip_code.message}
                        </FormErrorMessage>
                    </FormControl>{/* ===== ココマデ ===== */}

                    <FormControl isInvalid={errors.address1}>{/* ----- ヒトマトマリ ----- */}
                        <FormLabel htmlFor='address1'>住所</FormLabel>
                        <Input
                            id='address1'
                            placeholder='住所1'
                            {...register('address1')}
                        />
                        <FormErrorMessage>
                            {errors.address1 && errors.address1.message}
                        </FormErrorMessage>
                    </FormControl>{/* ===== ココマデ ===== */}

                    <FormControl isInvalid={errors.address2}>{/* ----- ヒトマトマリ ----- */}
                        <Input
                            id='address2'
                            placeholder='住所2'
                            {...register('address2')}
                        />
                        <FormErrorMessage>
                            {errors.address2 && errors.address2.message}
                        </FormErrorMessage>
                    </FormControl>{/* ===== ココマデ ===== */}

                    <FormControl isInvalid={errors.address3}>{/* ----- ヒトマトマリ ----- */}
                        <Input
                            id='address3'
                            placeholder='住所3'
                            {...register('address3')}
                        />
                        <FormErrorMessage>
                            {errors.address3 && errors.address3.message}
                        </FormErrorMessage>
                    </FormControl>{/* ===== ココマデ ===== */}

                    <FormControl isInvalid={errors.name1}>{/* ----- ヒトマトマリ ----- */}
                        <FormLabel htmlFor='name1'>名称</FormLabel>
                        <Input
                            id='name1'
                            placeholder='名称1'
                            {...register('name1')}
                        />
                        <FormErrorMessage>
                            {errors.name1 && errors.name1.message}
                        </FormErrorMessage>
                    </FormControl>{/* ===== ココマデ ===== */}

                    <FormControl isInvalid={errors.name2}>{/* ----- ヒトマトマリ ----- */}
                        <Input
                            id='name2'
                            placeholder='名称2'
                            {...register('name2')}
                        />
                        <FormErrorMessage>
                            {errors.name2 && errors.name2.message}
                        </FormErrorMessage>
                    </FormControl>{/* ===== ココマデ ===== */}

                    <FormControl isInvalid={errors.alias}>{/* ----- ヒトマトマリ ----- */}
                        <FormLabel htmlFor='alias'>検索用別名</FormLabel>
                        <Input
                            id='alias'
                            placeholder='検索用別名'
                            {...register('alias')}
                        />
                        <FormErrorMessage>
                            {errors.alias && errors.alias.message}
                        </FormErrorMessage>
                    </FormControl>{/* ===== ココマデ ===== */}

                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Submit
                    </Button>
                </form>
            </Container>
        </VStack>
    );
};

export default CreateCustomer;