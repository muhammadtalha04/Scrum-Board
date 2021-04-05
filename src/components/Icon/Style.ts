import styled from 'styled-components';
import { Align } from '../../types';

interface SpanProps {
    align: Align;
}

interface IProps {
    color?: string;
    size?: string;
}

export const Span = styled.span<SpanProps>`
    text-align: ${props => props.align};
    margin-right: 5px;
    display: flex;
`;

export const I = styled.i<IProps>`
    cursor: pointer;
    ${props => props.color !== undefined && `color: ${props.color};`}
    ${props => props.size !== undefined && `font-size: ${props.size}pt;`}
    align-self: center;
`;