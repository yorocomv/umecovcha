import { useForm } from 'react-hook-form'
import {
    VStack,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react'
import { axiosInst } from './axios-instance';

const CreateCustomer = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async d => {
        try {
            const res = await axiosInst.post('/customers', d);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <VStack padding={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name1}>
                    <FormLabel htmlFor='name1'>名称1</FormLabel>
                    <Input
                        id='name1'
                        placeholder='名前'
                        {...register('name1', {
                            required: 'This is required',
                            minLength: { value: 1, message: 'Minimum length should be 1' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name1 && errors.name1.message}
                    </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </form>
        </VStack>
    );
};

export default CreateCustomer;