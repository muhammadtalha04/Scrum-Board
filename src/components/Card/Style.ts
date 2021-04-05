import styled from 'styled-components';
import { Colors } from '../../colors';

interface TicketListProps {
    isOver: boolean;
}

export const OuterDiv = styled.div`
    background-color: ${Colors.Card.background};
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
    width: 100%;
    height: 100%;
`;

export const CardHeader = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

export const CardBody = styled.div`
    padding: 5px 0px;
`;

export const TicketsList = styled.div<TicketListProps>`
    min-height: 30px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: ${props => props.isOver ? "#c4c4c4" : "transparent"};
    ${props => props.isOver === true && `padding-bottom: 40px;`}
`;