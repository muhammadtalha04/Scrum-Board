import React from 'react';
import { useDrag } from 'react-dnd';
import { DragItemTypes } from '../../types';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import { TicketBody, TicketHeader, TicketHeaderIcons, TicketWrapper } from './Style';

interface TicketProps {
    id: string;
    title: string;
    description: string;
    cardId: string;
    handleEdit: (id: string, cardId: string) => void
    handleDelete: (id: string, cardId: string) => void
}

const Ticket: React.FC<TicketProps> = ({ id, title, description, cardId, handleEdit, handleDelete }) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: DragItemTypes.Ticket,
        item: { ticketId: id, cardId: cardId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <TicketWrapper ref={dragPreview} isDragging={isDragging}>
            <TicketHeader ref={drag}>
                <Text text={title} />

                <TicketHeaderIcons>
                    <Icon icon="fa fa-pencil" align="right" handleClick={() => handleEdit(id, cardId)} />
                    <Icon icon="fa fa-trash" align="right" handleClick={() => handleDelete(id, cardId)} />
                </TicketHeaderIcons>
            </TicketHeader>

            <TicketBody>
                <Text text={description} />
            </TicketBody>
        </TicketWrapper>
    );
}

export default Ticket;