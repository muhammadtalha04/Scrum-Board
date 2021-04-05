import React from 'react';
import { InputElement } from './Style';

interface InputProps {
    value: string;
    reference: React.RefObject<HTMLInputElement>;
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({ value, reference, handleChange }) => {
    return (
        <InputElement ref={reference} onChange={handleChange} value={value} />
    );
}

export default Input;