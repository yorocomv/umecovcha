import { BellIcon } from "@chakra-ui/icons";
import { Divider, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";

const ListOfNotes = ({ notes }) => {
    const strLength = 30;
    // https://zenn.dev/cryptobox/articles/ace08cae85e3a2
    const [selectedNote, setSelectedNote] = useState('');

    const onOpenModal = id => setSelectedNote(id);
    const onCloseModal = () => setSelectedNote('');

    return (
        <>
            <Divider borderColor='darkgoldenrod' paddingTop={3} />
            <List spacing={3}>
                {notes.map((note, i) => (
                    <ListItem onClick={() => onOpenModal(i)} cursor='pointer' color='darkred' boxShadow='xs' key={i}>
                        <ListIcon as={BellIcon} color='darkgoldenrod' />
                        {note.body.slice(0, strLength)}
                        {note.body.length > strLength && '...'}
                        <Modal
                            isOpen={i === selectedNote}
                            onClose={onCloseModal}
                            isCentered
                            motionPreset='scale'
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>✍</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <pre>{note.body}</pre>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default ListOfNotes;
