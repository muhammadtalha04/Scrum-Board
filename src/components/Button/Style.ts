import styled from 'styled-components';

interface ButtonStyleProps {
    width: "full" | "auto";
    margin?: "left" | "right" | undefined;
}

export const Btn = styled.button<ButtonStyleProps>`
    ${props => props.width === "full" ? `width: 100%;` : `min-width: 150px;`}
    padding: 7px 0px;
    cursor: pointer;
    ${props => props.margin !== undefined && `margin-${props.margin}: 10px;`}
`;