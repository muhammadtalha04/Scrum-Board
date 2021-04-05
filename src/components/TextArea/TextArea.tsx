import React from 'react';
import { TextAreaElement } from './Style';

interface TextAreaProps {
    value: string;
    reference: React.RefObject<HTMLTextAreaElement>;
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const TextArea: React.FC<TextAreaProps> = ({ value, reference, handleChange }) => {
    return (
        <TextAreaElement value={value} ref={reference} onChange={handleChange} rows={3} />
    );
}

export default TextArea;