import React from 'react';
import { InputElement } from './Style';

interface InputProps {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, handleChange }) => {
    return (
        <InputElement onChange={(e) => handleChange(e)} value={value} />
    );
}

export default Input;