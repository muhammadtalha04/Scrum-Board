import React, { useCallback, useEffect, useState } from 'react';
import Board from './components/Board/Board';
import Navbar from './components/Navbar/Navbar';
import { useBoardContext } from './contexts/BoardContext';
import { ActionTypes, CardType, FormActionTypes, TicketType } from './types';
import { addTicket, getData } from './utils';
import { v4 as uuid } from 'uuid';
import Popup from './components/Popup/Popup';
import { FormTypes, PopupTitles } from './constants';
import { useFormContext } from './contexts/FormContext';

const App: React.FC = () => {
  const { boardState, boardDispatch } = useBoardContext();
  const { formState, formDispatch } = useFormContext();

  // State hook to show/hide the popup on the screen
  const [showPopup, toggle] = useState(false);

  // Form elements change handlers
  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({ type: FormActionTypes.SET_TITLE, payload: { title: event.target.value } });
  }, [formDispatch]);

  const handleDescChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    formDispatch({ type: FormActionTypes.SET_DESCRIPTION, payload: { description: event.target.value } });
  }, [formDispatch]);

  const handleCardChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    formDispatch({ type: FormActionTypes.SET_CARD, payload: { card: event.target.value } });
  }, [formDispatch]);
  // -----------------------------------------------------------------

  // To show or hide the popup window
  const togglePopup = useCallback(() => {
    toggle(!showPopup);
  }, [showPopup]);
  // ------------------------------------------------------------------

  // To hide the popup window and to reset the form state
  const handleCancel = useCallback(() => {
    formDispatch({ type: FormActionTypes.RESET_FORM });
    togglePopup();
  }, [togglePopup, formDispatch]);
  // ------------------------------------------------------------------

  // Creates a new card and stores it in localStorage and state
  const saveCard = useCallback(() => {
    // Creating a new card
    const card: CardType = {
      id: `${uuid()}`,
      title: formState.title,
      ticket_ids: []
    };

    formDispatch({ type: FormActionTypes.RESET_FORM });       // To reset the form to its initial state
    togglePopup();

    window.localStorage.setItem("cards", JSON.stringify([...boardState.cards, card]));    // Storing the newly created card in the localStorage
    boardDispatch({ type: ActionTypes.ADD_CARD, payload: { card: card } });               // Storing the newly created card in the boardState
  }, [boardState.cards, formState.title, boardDispatch, formDispatch, togglePopup]);
  // -----------------------------------------------------------------

  // Creates a new card and stores it in localStorage and state
  const saveTicket = useCallback(() => {
    // Creating a new ticket
    const ticket: TicketType = {
      id: `${uuid()}`,
      title: formState.title,
      description: formState.description
    };

    const updatedCards = addTicket(ticket.id, formState.card, boardState.cards);    // Adding the newly created ticket in its specific card

    formDispatch({ type: FormActionTypes.RESET_FORM });         // To reset the form to its initial state
    togglePopup();

    window.localStorage.setItem("cards", JSON.stringify(updatedCards));       // Storing the updated cards into the localStorage
    window.localStorage.setItem("tickets", JSON.stringify([...boardState.tickets, ticket]));    // Storing the newly created ticket in the localStorage
    boardDispatch({ type: ActionTypes.ADD_TICKET, payload: { ticket: ticket, cards: updatedCards } });    // Storing the newly created ticket in the boardState
  }, [boardState, formState, boardDispatch, formDispatch, togglePopup]);
  // -----------------------------------------------------------------

  // Creates a new card and stores it in localStorage and state
  const saveEditedTicket = useCallback((id: string) => {
    const updatedTickets = boardState.tickets;

    updatedTickets.map((ticket) => {
      if (ticket.id === id) {
        ticket.title = formState.title;
        ticket.description = formState.description;
      }

      return ticket;
    });

    formDispatch({ type: FormActionTypes.RESET_FORM });        // To reset the form to its initial state
    togglePopup();

    window.localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    boardDispatch({ type: ActionTypes.EDIT_TICKET, payload: { tickets: updatedTickets } });
  }, [boardState, formState, boardDispatch, formDispatch, togglePopup]);
  // -----------------------------------------------------------------

  // Displays a popup window to enter the title of new card
  const handleAddNewCard = useCallback(() => {
    formDispatch({ type: FormActionTypes.SET_DATA, payload: { popupTitle: PopupTitles.CreateCard, type: FormTypes.CreateCard } });
    togglePopup();
  }, [formDispatch, togglePopup]);
  // ------------------------------------------------------------------

  // Displays a popup window to create a new ticket
  const handleAddNewTicket = useCallback(() => {
    formDispatch({ type: FormActionTypes.SET_DATA, payload: { popupTitle: PopupTitles.CreateTicket, type: FormTypes.CreateTicket } });
    togglePopup();
  }, [formDispatch, togglePopup]);
  // ------------------------------------------------------------------

  // Displays a popup window to create a new ticket
  const handleEditTicket = useCallback((id: string, cardId: string) => {
    const ticket = boardState.tickets.filter((ticket) => {
      return ticket.id === id;
    })[0];

    formDispatch({
      type: FormActionTypes.SET_DATA,
      payload: {
        popupTitle: PopupTitles.EditTicket,
        type: FormTypes.EditTicket,
        ticketId: id,
        title: ticket.title,
        description: ticket.description,
        card: cardId,
      }
    });

    togglePopup();
  }, [togglePopup, formDispatch, boardState.tickets]);
  // ------------------------------------------------------------------


  // Deletes the given ticket from state and localStorage
  const handleTicketDelete = useCallback((ticketId: string, cardId: string) => {
    boardDispatch({ type: ActionTypes.DELETE_TICKET, payload: { id: ticketId, cardId: cardId } })
  }, [boardDispatch]);
  // ------------------------------------------------------------------

  // Deletes the given card from state and localStorage
  const handleCardDelete = useCallback((id: string) => {
    boardDispatch({ type: ActionTypes.DELETE_CARD, payload: { id: id } })
  }, [boardDispatch]);
  // ------------------------------------------------------------------

  useEffect(() => {
    if (window.localStorage.getItem('cards') === null) {
      window.localStorage.setItem("cards", JSON.stringify(boardState.cards));
      window.localStorage.setItem("tickets", JSON.stringify(boardState.tickets));
    } else {
      const { cards, tickets } = getData();   // Get cards and tickets from the local storage

      if (cards.length !== boardState.cards.length || tickets.length !== boardState.tickets.length) {
        boardDispatch({ type: ActionTypes.FETCH_DATA, payload: { cards: cards, tickets: tickets } });
      }
    }
  }, [boardState, boardDispatch]);

  return (
    <React.Fragment>
      {
        showPopup &&
        (
          <Popup
            handleTitleChange={handleTitleChange}
            handleDescChange={handleDescChange}
            handleCardChange={handleCardChange}
            handleClose={handleCancel}
            handleCardSave={saveCard}
            handleTicketSave={saveTicket}
            handleTicketEdit={saveEditedTicket}
          />
        )
      }

      <Navbar
        handleAddCard={handleAddNewCard}
        handleAddTicket={handleAddNewTicket}
      />

      <Board
        handleCardDelete={handleCardDelete}
        handleEditTicket={handleEditTicket}
        handleTicketDelete={handleTicketDelete}
      />
    </React.Fragment>
  );
}

export default App;
