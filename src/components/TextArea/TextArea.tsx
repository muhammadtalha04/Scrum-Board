import React from 'react';
import { TextAreaElement } from './Style';

interface TextAreaProps {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, handleChange }) => {
    return (
        <TextAreaElement value={value} onChange={(e) => handleChange(e)} rows={3} />
    );
}

export default TextArea;