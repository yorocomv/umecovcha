import { BellIcon } from "@chakra-ui/icons";
import { Divider, List, ListIcon, ListItem } from "@chakra-ui/react";

const ListOfNotes = ({ notes }) => {
    return (
        <>
            <Divider borderColor='darkgoldenrod' paddingTop={3} />
            <List spacing={3}>
                {notes.map((note) => (
                    <ListItem color='darkred' boxShadow='xs' key={note.serial_number}>
                        <ListIcon as={BellIcon} color='darkgoldenrod' />
                        {note.body}
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default ListOfNotes;