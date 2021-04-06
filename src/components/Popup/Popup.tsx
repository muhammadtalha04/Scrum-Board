import React from 'react';
import { ModalBody, ModalContent, ModalDiv, ModalHeader } from './Style';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Form from '../Form/Form';
import { useFormContext } from '../../contexts/FormContext';

interface PopupProps {
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleCardChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleClose: React.MouseEventHandler<HTMLButtonElement>;
    handleCardSave: React.MouseEventHandler<HTMLButtonElement>;
    handleTicketSave: React.MouseEventHandler<HTMLButtonElement>;
    handleTicketEdit: (id: string) => void;
}

const Popup: React.FC<PopupProps> = ({ handleClose, handleCardSave, handleTicketSave, handleTicketEdit, handleTitleChange, handleDescChange, handleCardChange }) => {
    const { formState } = useFormContext();

    return (
        <ModalDiv>
            <ModalContent>
                <ModalHeader>
                    <Text text={formState.popupTitle} strong={true} />
                    <Icon icon="fa fa-times" align="right" handleClick={handleClose} />
                </ModalHeader>

                <ModalBody>
                    <Form
                        titleChange={handleTitleChange}
                        descChange={handleDescChange}
                        cardChange={handleCardChange}
                        handleCardSave={handleCardSave}
                        handleTicketEdit={handleTicketEdit}
                        handleTicketSave={handleTicketSave}
                        handleCancel={handleClose}
                    />
                </ModalBody>
            </ModalContent>
        </ModalDiv>
    );
}

export default Popup;