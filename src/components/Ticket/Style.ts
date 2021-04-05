import styled from 'styled-components';

interface TicketWrapperProps {
    isDragging: boolean;
}

export const TicketWrapper = styled.div<TicketWrapperProps>`
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    opacity: ${props => props.isDragging ? 0.5 : 1};
    cursor: grab;
`;

export const TicketHeader = styled.div`
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

export const TicketHeaderIcons = styled.div`
    display: flex;
`;

export const TicketBody = styled.div`
    padding: 10px 0px;
`;