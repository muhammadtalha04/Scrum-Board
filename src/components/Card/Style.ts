import styled from 'styled-components';
import { Colors } from '../../colors';

interface DropProps {
    isOver: boolean;
}

interface DragProps {
    isDragging: boolean;
}

export const DropWrapper = styled.div<DropProps>`
    background: ${props => props.isOver ? "#c4c4c4" : `${Colors.Card.background}`};
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
    width: 100%;
    height: 100%;
    ${props => props.isOver === true && `padding-bottom: 40px;`}
`;

export const OuterDiv = styled.div<DragProps>`
    opacity: ${props => props.isDragging ? 0.5 : 1};
    cursor: grab;
`;

export const CardHeader = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

export const CardBody = styled.div`
    padding: 5px 0px;
`;

export const TicketsList = styled.div<DropProps>`
    min-height: 30px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: ${props => props.isOver ? "#c4c4c4" : "transparent"};
    ${props => props.isOver === true && `padding-bottom: 40px;`}
`;