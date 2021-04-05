import React from 'react';
import { Btn } from './Style';

interface ButtonProps {
    text: string;
    width: "full" | "auto";
    handleClick?: React.MouseEventHandler<HTMLButtonElement>
    margin?: "left" | "right" | undefined;
}

const Button: React.FC<ButtonProps> = ({ text, width, margin, handleClick }) => {
    return (
        <Btn width={width} onClick={handleClick} margin={margin}>
            {text}
        </Btn>
    );
}

export default Button;