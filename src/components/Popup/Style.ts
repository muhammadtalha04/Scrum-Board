import styled from 'styled-components';

export const ModalDiv = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    align-items: start;
    justify-content: center;
`;

export const ModalContent = styled.div`
    background: #fff;
    position: relative;
    border-radius: 5px;
    min-width: 30%;
    top: 20%;
`;

export const ModalHeader = styled.div`
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    padding: 20px;
`;

export const ModalBody = styled.div`
    padding: 20px
`;