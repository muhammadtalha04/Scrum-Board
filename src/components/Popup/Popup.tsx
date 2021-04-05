import React from 'react';
import { ModalBody, ModalContent, ModalDiv, ModalHeader } from './Style';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Form from '../Form/Form';
import { CardType } from '../../types';

interface PopupProps {
    heading: string;
    type: string;
    ticketId: string;
    title: string;
    description: string;
    card: string;
    titleRef: React.RefObject<HTMLInputElement>;
    descRef: React.RefObject<HTMLTextAreaElement>;
    cardRef: React.RefObject<HTMLSelectElement>;
    handleTitleChange: React.ChangeEventHandler<HTMLInputElement>;
    handleDescChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    handleCardChange: React.ChangeEventHandler<HTMLSelectElement>;
    handleClose: React.MouseEventHandler<HTMLButtonElement>;
    handleCardSave: React.MouseEventHandler<HTMLButtonElement>;
    handleTicketSave: React.MouseEventHandler<HTMLButtonElement>;
    handleTicketEdit: (id: string) => void;
    cardsList: CardType[];
}

const Popup: React.FC<PopupProps> = ({ heading, type, ticketId, title, description, card, titleRef, descRef, cardRef, handleClose, handleCardSave, handleTicketSave, handleTicketEdit, handleTitleChange, handleDescChange, handleCardChange, cardsList }) => {
    return (
        <ModalDiv>
            <ModalContent>
                <ModalHeader>
                    <Text text={heading} strong={true} />
                    <Icon icon="fa fa-times" align="right" handleClick={handleClose} />
                </ModalHeader>

                <ModalBody>
                    <Form
                        type={type}
                        ticketId={ticketId}
                        title={title}
                        titleRef={titleRef}
                        titleChange={handleTitleChange}
                        description={description}
                        descRef={descRef}
                        descChange={handleDescChange}
                        card={card}
                        cardRef={cardRef}
                        cardChange={handleCardChange}
                        handleCardSave={handleCardSave}
                        handleTicketEdit={handleTicketEdit}
                        handleTicketSave={handleTicketSave}
                        handleCancel={handleClose}
                        cardsList={cardsList}
                    />
                </ModalBody>
            </ModalContent>
        </ModalDiv>
    );
}

export default Popup;