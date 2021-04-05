import styled from 'styled-components';

interface TextStyleProps {
    isTitle?: boolean;
    strong?: boolean;
}

export const TextElement = styled.p<TextStyleProps>`
    margin: 0px;
    width: 100%;
    ${props => (props.isTitle !== undefined && props.isTitle === true && `font-weight: bold; font-size: 16pt;`)}
    ${props => props.strong !== undefined && props.strong === true && `font-weight: bold;`}
`;