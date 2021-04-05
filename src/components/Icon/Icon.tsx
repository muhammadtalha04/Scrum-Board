import React from 'react';
import { Align } from '../../types';
import { I, Span } from './Style';

interface IconProps {
    icon: string;
    align: Align;
    handleClick?: React.MouseEventHandler<HTMLSpanElement>
    color?: string;
    size?: string;
}

const Icon: React.FC<IconProps> = ({ icon, align, color, size, handleClick }) => {
    return (
        <Span align={align} onClick={handleClick}>
            <I className={icon} color={color} size={size} />
        </Span>
    );
}

export default Icon;