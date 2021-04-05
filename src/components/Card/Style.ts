import styled from 'styled-components';
import { Colors } from '../../colors';

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

export const TicketsList = styled.div`
    min-height: 30px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
`;