import React from 'react';
import { useDrop } from 'react-dnd';
import { useBoardContext } from '../../contexts/BoardContext';
import { ActionTypes, DragData, DragItemTypes, TicketType } from '../../types';
import { filterTickets } from '../../utils';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Ticket from '../Ticket/Ticket';
import { CardBody, CardHeader, OuterDiv, TicketsList } from './Style';

interface CardProps {
    id: string;
    title: string;
    ticket_ids: string[];
    handleDelete: (id: string) => void
    handleEditTicket: (ticketId: string, cardId: string) => void
    handleTicketDelete: (ticketId: string, cardId: string) => void
}

const Card: React.FC<CardProps> = ({ id, title, ticket_ids, handleDelete, handleEditTicket, handleTicketDelete }) => {
    const { boardState, boardDispatch } = useBoardContext();
    const tickets: TicketType[] = filterTickets(ticket_ids, boardState.tickets);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: DragItemTypes.Ticket,
        drop: (item: DragData) => boardDispatch({ type: ActionTypes.MOVE_TICKET, payload: { ticketId: item.ticketId, fromCard: item.cardId, toCard: id } }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        })
    }), [id]);

    return (
        <OuterDiv>
            <CardHeader>
                <Text text={title} />
                <Icon icon="fa fa-trash" align="right" handleClick={() => handleDelete(id)} />
            </CardHeader>

            <CardBody>
                <TicketsList ref={drop} isOver={isOver}>
                    {
                        tickets.length > 0 && tickets.map((ticket) => {
                            return (
                                <Ticket
                                    key={ticket.id}
                                    id={ticket.id}
                                    title={ticket.title}
                                    description={ticket.description}
                                    cardId={id}
                                    handleEdit={handleEditTicket}
                                    handleDelete={handleTicketDelete}
                                />
                            );
                        })
                    }
                </TicketsList>
            </CardBody>
        </OuterDiv>
    );
}

export default Card;