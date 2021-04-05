import { CardType, TicketType } from "../types";

// Get cards from the localstorage of browser. If found, json parse it and return. Else return null.
const getCards = () => {
    const cards = window.localStorage.getItem('cards');

    return JSON.parse(cards!);
}

// Get tickets from the localstorage of browser. If found, json parse it and return. Else return null.
const getTickets = () => {
    const tickets = window.localStorage.getItem('tickets');

    return JSON.parse(tickets!);
}

// This funcntion gets the cards and tickets from the local storage and returns them
export const getData = () => {
    return { cards: getCards(), tickets: getTickets() };
}

// 
export const filterTickets = (ids: string[], data: TicketType[]) => {
    return data.filter((d) => {
        return ids.indexOf(d.id) !== -1;
    });
}

// This function traverses through the array of cards and adds the given ticket id in the respective card.
export const addTicket = (ticketId: string, cardId: string, cards: CardType[]): CardType[] => {
    cards.map((card) => {
        if (card.id === cardId) {
            card.ticket_ids.push(ticketId);
        }
        return card;
    });

    return cards;
}

// Gets cards array from browser's locastorage and adds the newly created card in it. After adding it stores it back into the localstorage and returns the updated cards array. 
// export const addCard = (data: CardType) => {
//     let cards: CardType[] = JSON.parse(window.localStorage.getItem("cards")!);

//     if (cards !== null) {
//         cards.push(data);

//         window.localStorage.setItem("cards", JSON.stringify(cards));
//     }

//     return data;
// }

// Gets cards array from browser's locastorage and updates it back into the localstorage after removing the specified card and returns the updated cards array. 
export const deleteCard = (cardId: string) => {
    let cards: CardType[] = getCards();

    if (cards !== null) {
        cards = cards.filter((card) => card.id !== cardId);
        window.localStorage.setItem("cards", JSON.stringify(cards));
    }

    return cards;
}

// Gets cards array from browser's locastorage and updates it back into the localstorage after removing the specified card and returns the updated cards array. 
export const deleteTicket = (ticketId: string, cardId: string) => {
    let tickets: TicketType[] = getTickets();
    let cards: CardType[] = getCards();

    if (tickets !== null) {
        tickets = tickets.filter((ticket) => ticket.id !== ticketId);
        cards = removeFromCard(ticketId, cardId, cards);

        window.localStorage.setItem("cards", JSON.stringify(cards));
        window.localStorage.setItem("tickets", JSON.stringify(tickets));
    }

    return { cards: cards, tickets: tickets };
}

const removeFromCard = (ticketId: string, cardId: string, cards: CardType[]) => {
    cards.map((card) => {
        if (card.id === cardId) {
            card.ticket_ids = card.ticket_ids.filter((id) => id !== ticketId);
        }

        return card;
    });

    return cards;
}

// Moves the ticket from one card to another
export const moveTicket = (ticketId: string, fromCardId: string, toCardId: string) => {
    const cards: CardType[] = getCards();

    cards.map((card) => {
        if (fromCardId !== toCardId) {
            if (card.id === fromCardId) {
                card.ticket_ids = card.ticket_ids.filter((tId) => tId !== ticketId);
            }

            if (card.id === toCardId) {
                card.ticket_ids.push(ticketId);
            }
        }

        return card;
    });

    window.localStorage.setItem("cards", JSON.stringify(cards));

    return cards;
}