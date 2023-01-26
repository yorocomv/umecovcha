import { useFormContext } from 'react-hook-form';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Select,
} from '@chakra-ui/react';

const CustomerInputs = ({ invoices }) => {

    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <FormControl isInvalid={errors.tel}>{/* ----- ヒトマトマリ ----- */}
                <FormLabel htmlFor='tel'>電話番号</FormLabel>
                <Input
                    id='tel'
                    placeholder='電話番号'
                    autoFocus={true}
                    {...register('tel')}
                    width='2xs'
                />
                <FormErrorMessage>
                    {errors.tel && errors.tel.message}
                </FormErrorMessage>
            </FormControl>{/* ===== ココマデ ===== */}

            <FormControl isInvalid={errors.zipCode}>{/* ----- ヒトマトマリ ----- */}
                <FormLabel htmlFor='zip_code'>郵便番号</FormLabel>
                <Input
                    id='zip_code'
                    placeholder='郵便番号'
                    {...register('zipCode')}
                    width='2xs'
                    className='p-postal-code'
                />
                <FormErrorMessage>
                    {errors.zipCode && errors.zipCode.message}
                </FormErrorMessage>
            </FormControl>{/* ===== ココマデ ===== */}

            <FormControl isInvalid={errors.address1}>{/* ----- ヒトマトマリ ----- */}
                <FormLabel htmlFor='address1'>住所</FormLabel>
                <Input
                    id='address1'
                    placeholder='住所1'
                    {...register('address1')}
                    className='p-region p-locality p-street-address p-extended-address'
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

            <FormLabel htmlFor='invoice_id'>伝票の種類</FormLabel>
            <Select
                id='invoice_id'
                {...register('invoiceId')}
                width='2xs'
            >
                {invoices.map(invoice => (
                    <option
                        key={invoice.id}
                        value={invoice.id}
                    >
                        {invoice.name}
                    </option>
                ))}
            </Select>
        </>
    );
};

export default CustomerInputs;