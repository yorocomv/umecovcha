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
    const handleEdit = snum => {
        setSelectedNote('');
        navigate(`/recordnote/${customerId}?serialnumber=${snum}`);
    };

    return (
        <>
            <Divider borderColor='darkgoldenrod' paddingTop={3} />
            <List spacing={3}>
                {notes.map((note, i) => (
                    <ListItem onClick={() => onOpenModal(i)} cursor='pointer' color='darkred' boxShadow='xs' key={i}>
                        <ListIcon as={BellIcon} color='darkgoldenrod' />
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
                                        onClick={() => handleEdit(note.serial_number)}
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
