import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useBoardContext } from '../../contexts/BoardContext';
import { ActionTypes, TicketDragData, DragItemTypes, TicketType, CardDragData, CardType } from '../../types';
import { filterTickets, moveCard } from '../../utils';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Ticket from '../Ticket/Ticket';
import { CardBody, CardHeader, DropWrapper, OuterDiv, TicketsList } from './Style';

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

    // useDrop hook for handling ticket drop
    const [{ isOver }, drop] = useDrop(() => ({
        accept: DragItemTypes.Ticket,
        drop: (item: TicketDragData) => boardDispatch({ type: ActionTypes.MOVE_TICKET, payload: { ticketId: item.ticketId, fromCard: item.cardId, toCard: id } }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        })
    }), [id]);

    // useDrop hook for handling card drop
    const [{ isCardOver }, cardDrop] = useDrop(() => ({
        accept: DragItemTypes.Card,
        drop: (item: CardDragData) => {
            if (item.cardId !== id) {
                const cards: CardType[] = moveCard(item.cardId, id);
                window.localStorage.setItem("cards", JSON.stringify(cards));
                boardDispatch({ type: ActionTypes.SET_CARDS, payload: { cards: cards } });
            }
        },
        collect: (monitor) => ({
            isCardOver: monitor.isOver(),
        })
    }), []);

    // useDrag hook for handling card dragging
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: DragItemTypes.Card,
        item: { cardId: id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <DropWrapper ref={cardDrop} isOver={isCardOver}>
            <OuterDiv ref={dragPreview} isDragging={isDragging}>
                <CardHeader ref={drag}>
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
        </DropWrapper>
    );
}

export default Card;