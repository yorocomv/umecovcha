import { BellIcon } from "@chakra-ui/icons";
import {
    Button,
    Divider,
    List,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cs from '../../addStyles.module.css';

const ListOfNotes = ({ customerId, notes }) => {
    const navigate = useNavigate();
    const strLength = 30;
    // https://zenn.dev/cryptobox/articles/ace08cae85e3a2
    const [selectedNote, setSelectedNote] = useState('');

    const onOpenModal = id => setSelectedNote(id);
    const onCloseModal = () => setSelectedNote('');
    const handleEdit = rank => {
        setSelectedNote('');
        navigate(`/recordnote/${customerId}?rank=${rank}`);
    };

    return (
        <>
            <Divider borderColor='darkgoldenrod' paddingTop={3} />
            <List spacing={3}>
                {notes.map((note, i) => (
                    <ListItem className={cs.notePreview} onClick={() => onOpenModal(i)} cursor='pointer' color='purple.500' boxShadow='xs' key={i}>
                        <ListIcon as={BellIcon} color='purple.500' />
                        {note.body.slice(0, strLength)}
                        {note.body.length > strLength && ' ...'}
                        <Modal
                            isOpen={i === selectedNote}
                            onClose={onCloseModal}
                            isCentered
                            motionPreset='scale'
                        >
                            <ModalOverlay />
                            <ModalContent className={cs.notes}>
                                <ModalHeader>✍ ({i + 1}/{notes.length})</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text className={cs.notes}>{note.body}</Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        onClick={() => handleEdit(note.rank)}
                                        colorScheme='purple'>編集</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default ListOfNotes;
