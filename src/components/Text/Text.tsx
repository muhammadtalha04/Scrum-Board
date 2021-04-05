import React from 'react';
import { TextElement } from './Style';

interface TextProps {
    text: string;
    title?: boolean;
    strong?: boolean;
}

const Text: React.FC<TextProps> = ({ text, title, strong }) => {
    return (
        <TextElement isTitle={title} strong={strong}>
            {text}
        </TextElement>
    );
}

export default Text;