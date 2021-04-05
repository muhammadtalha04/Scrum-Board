import React, { useCallback, useEffect, useRef, useState } from 'react';
import Board from './components/Board/Board';
import Navbar from './components/Navbar/Navbar';
import { useBoardContext } from './contexts/BoardContext';
import { ActionTypes, CardType, TicketType } from './types';
import { addTicket, getData } from './utils';
import { v4 as uuid } from 'uuid';
import Popup from './components/Popup/Popup';
import { FormTypes, PopupTitles } from './constants';

const App: React.FC = () => {
  const { boardState, boardDispatch } = useBoardContext();

  const [showPopup, toggle] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [type, setType] = useState("");
  const [ticketIdState, setTicketId] = useState("");

  const { cards: cardsList } = getData();

  // States to be used for creating and editing cards and tickets
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cardState, setCard] = useState("");

  // References to be used for creating and editing cards and tickets
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLSelectElement>(null);
  // -----------------------------------------------------------------

  // Form elements change handlers
  const handleTitleChange = useCallback(() => {
    if (titleRef.current !== null) {
      setTitle(titleRef.current.value);
    }
  }, [titleRef]);

  const handleDescChange = useCallback(() => {
    if (descRef.current !== null) {
      setDescription(descRef.current.value);
    }
  }, [descRef]);

  const handleCardChange = useCallback(() => {
    if (cardRef.current !== null) {
      setCard(cardRef.current.value);
    }
  }, [cardRef]);
  // -----------------------------------------------------------------

  // Resets the values of all the states being used in the form
  const resetForm = useCallback(() => {
    setPopupTitle("");
    setType("");
    setTitle("");
    setDescription("");
    setCard("");
    setTicketId("");
  }, []);
  // -----------------------------------------------------------------

  // To show or hide the popup window
  const togglePopup = useCallback(() => {
    toggle(!showPopup);
  }, [showPopup]);
  // ------------------------------------------------------------------

  // To show or hide the popup window
  const handleCancel = useCallback(() => {
    resetForm();
    togglePopup();
  }, [togglePopup, resetForm]);
  // ------------------------------------------------------------------

  // Creates a new card and stores it in localStorage and state
  const saveCard = useCallback(() => {
    const card: CardType = {
      id: `${uuid()}`,
      title: title,
      ticket_ids: []
    };

    resetForm();    // To reset the form to its initial state
    togglePopup();

    window.localStorage.setItem("cards", JSON.stringify([...boardState.cards, card]));
    boardDispatch({ type: ActionTypes.ADD_CARD, payload: { card: card } });
  }, [boardState.cards, title, boardDispatch, resetForm, togglePopup]);
  // -----------------------------------------------------------------

  // Creates a new card and stores it in localStorage and state
  const saveTicket = useCallback(() => {
    const ticket: TicketType = {
      id: `${uuid()}`,
      title: title,
      description: description
    };

    const updatedCards = addTicket(ticket.id, cardState, boardState.cards);

    resetForm();    // To reset the form to its initial state
    togglePopup();

    window.localStorage.setItem("cards", JSON.stringify(updatedCards));
    window.localStorage.setItem("tickets", JSON.stringify([...boardState.tickets, ticket]));
    boardDispatch({ type: ActionTypes.ADD_TICKET, payload: { ticket: ticket, cards: updatedCards } });
  }, [boardState, title, description, cardState, boardDispatch, resetForm, togglePopup]);
  // -----------------------------------------------------------------

  // Creates a new card and stores it in localStorage and state
  const saveEditedTicket = useCallback((id: string) => {
    const updatedTickets = boardState.tickets;

    updatedTickets.map((ticket) => {
      if (ticket.id === id) {
        ticket.title = title;
        ticket.description = description;
      }

      return ticket;
    });

    resetForm();    // To reset the form to its initial state
    togglePopup();

    window.localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    boardDispatch({ type: ActionTypes.EDIT_TICKET, payload: { tickets: updatedTickets } });
  }, [boardState, title, description, boardDispatch, resetForm, togglePopup]);
  // -----------------------------------------------------------------

  // Displays a popup window to enter the title of new card
  const handleAddNewCard = useCallback(() => {
    setPopupTitle(PopupTitles.CreateCard);
    setType(FormTypes.CreateCard);

    togglePopup();
  }, [togglePopup]);
  // ------------------------------------------------------------------

  // Displays a popup window to create a new ticket
  const handleAddNewTicket = useCallback(() => {
    setPopupTitle(PopupTitles.CreateTicket);
    setType(FormTypes.CreateTicket);

    togglePopup();
  }, [togglePopup]);
  // ------------------------------------------------------------------

  // Displays a popup window to create a new ticket
  const handleEditTicket = useCallback((id: string, cardId: string) => {
    setPopupTitle(PopupTitles.EditTicket);
    setType(FormTypes.EditTicket);
    setTicketId(id);

    const ticket = boardState.tickets.filter((ticket) => {
      return ticket.id === id;
    })[0];

    setTitle(ticket.title);
    setDescription(ticket.description);
    setCard(cardId);

    togglePopup();
  }, [togglePopup, boardState.tickets]);
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
            heading={popupTitle}
            type={type}
            ticketId={ticketIdState}
            title={title}
            titleRef={titleRef}
            handleTitleChange={handleTitleChange}
            description={description}
            descRef={descRef}
            handleDescChange={handleDescChange}
            card={cardState}
            cardRef={cardRef}
            handleCardChange={handleCardChange}
            handleClose={handleCancel}
            handleCardSave={saveCard}
            handleTicketSave={saveTicket}
            handleTicketEdit={saveEditedTicket}
            cardsList={cardsList}
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
