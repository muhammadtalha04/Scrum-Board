import React from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import { Nav, Title } from './Style';

interface NavbarProps {
    handleAddCard: React.MouseEventHandler<HTMLButtonElement>;
    handleAddTicket: React.MouseEventHandler<HTMLButtonElement>;
}

const Navbar: React.FC<NavbarProps> = ({ handleAddCard, handleAddTicket }) => {

    return (
        <Nav>
            <Title>
                <Text text="Scrum Board" title={true} />
            </Title>

            <Button text="Add New Card" width="auto" handleClick={handleAddCard} />
            <Button text="Add New Ticket" width="auto" handleClick={handleAddTicket} margin="left" />
        </Nav>
    );
}

export default Navbar;