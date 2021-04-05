import React from 'react';
import { CardType } from '../../types';
import { Option, SelectElement } from './Style';

interface SelectBoxProps {
    value: string;
    reference: React.RefObject<HTMLSelectElement>;
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
    cards: CardType[];
}

const SelectBox: React.FC<SelectBoxProps> = ({ value, reference, handleChange, cards }) => {
    return (
        <SelectElement value={value} ref={reference} onChange={handleChange}>
            {
                cards.map((card) => <Option key={card.id} value={card.id}>{card.title}</Option>)
            }
        </SelectElement>
    );
}

export default SelectBox;