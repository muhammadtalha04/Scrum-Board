import React from 'react';
import { useBoardContext } from '../../contexts/BoardContext';
import { TicketType } from '../../types';
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
    const { boardState } = useBoardContext();
    const tickets: TicketType[] = filterTickets(ticket_ids, boardState.tickets);

    return (
        <OuterDiv>
            <CardHeader>
                <Text text={title} />
                <Icon icon="fa fa-trash" align="right" handleClick={() => handleDelete(id)} />
            </CardHeader>

            <CardBody>
                <TicketsList>
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