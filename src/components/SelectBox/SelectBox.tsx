import React from 'react';
import { CardType } from '../../types';
import { Option, SelectElement } from './Style';

interface SelectBoxProps {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    cards: CardType[];
}

const SelectBox: React.FC<SelectBoxProps> = ({ value, handleChange, cards }) => {
    return (
        <SelectElement value={value} onChange={handleChange}>
            {
                cards.map((card) => <Option key={card.id} value={card.id}>{card.title}</Option>)
            }
        </SelectElement>
    );
}

export default SelectBox;