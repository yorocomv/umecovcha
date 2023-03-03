import { useState } from 'react';
import { Container, FormControl, FormLabel, Textarea, VStack } from '@chakra-ui/react';
import cs from '../addStyles.module.css';

const RecordNote = () => {
    const [noteLength, setNoteLength] = useState(0);

    const handleChange = e => {};
    return (
        <VStack p={4}>
            <Container width='4xl' p={4} borderRadius={4} className={cs.lightSpot}>
                <form>
                    <FormControl>
                        <FormLabel htmlFor='note'>留意事項</FormLabel>
                        <Textarea id='note' autoFocus={true} height='3xs' />
                    </FormControl>
                </form>
            </Container>
        </VStack>
    );
};

export default RecordNote;