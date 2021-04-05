import React, { useMemo } from 'react';
import { useBoardContext } from '../../contexts/BoardContext';
import Card from '../Card/Card';
import { Container } from './Style';
import { CardType } from '../../types';

interface BoardProps {
    handleCardDelete: (id: string) => void;
    handleEditTicket: (ticketId: string, cardId: string) => void;
    handleTicketDelete: (ticketId: string, cardId: string) => void;
}

const Board: React.FC<BoardProps> = ({ handleCardDelete, handleEditTicket, handleTicketDelete }) => {
    const { boardState } = useBoardContext();

    const renderCards = useMemo(() => {
        const cards: CardType[] = boardState.cards;

        return cards.map((card) => {
            return (
                <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    ticket_ids={card.ticket_ids}
                    handleDelete={handleCardDelete}
                    handleEditTicket={handleEditTicket}
                    handleTicketDelete={handleTicketDelete}
                />
            );
        });

    }, [boardState.cards, handleCardDelete, handleEditTicket, handleTicketDelete]);

    return (
        <Container>
            {
                renderCards
            }
        </Container>
    );
}

export default Board;