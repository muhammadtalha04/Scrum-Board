import React from 'react';
import { FormTypes } from '../../constants';
import { CardType } from '../../types';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import SelectBox from '../SelectBox/SelectBox';
import Text from '../Text/Text';
import TextArea from '../TextArea/TextArea';
import { ButtonGroup, FormDiv, FormGroup, Label } from './Style';

interface FormProps {
    type: string;
    ticketId: string;
    title: string;
    description: string;
    card: string;
    titleRef: React.RefObject<HTMLInputElement>;
    descRef: React.RefObject<HTMLTextAreaElement>;
    cardRef: React.RefObject<HTMLSelectElement>;
    titleChange: React.ChangeEventHandler<HTMLInputElement>;
    descChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    cardChange: React.ChangeEventHandler<HTMLSelectElement>;
    handleCardSave: React.MouseEventHandler<HTMLButtonElement>;
    handleTicketSave: React.MouseEventHandler<HTMLButtonElement>;
    handleTicketEdit: (id: string) => void;
    handleCancel: React.MouseEventHandler<HTMLButtonElement>;
    cardsList: CardType[];
}

const Form: React.FC<FormProps> = ({ type, ticketId, title, titleRef, titleChange, description, descRef, descChange, card, cardRef, cardChange, handleCardSave, handleTicketSave, handleTicketEdit, handleCancel, cardsList }) => {

    return (
        <FormDiv>
            {/* Title */}
            <FormGroup>
                <Label>
                    <Icon icon="fa fa-asterisk" align="left" color="red" size='6' />
                    <Text text={"Title: "} />
                </Label>
                <Input value={title} reference={titleRef} handleChange={titleChange} />
            </FormGroup>

            {/* Description */}
            {
                (
                    (type === FormTypes.CreateTicket || type === FormTypes.EditTicket) &&
                    (
                        <FormGroup>
                            <Label>
                                <Icon icon="fa fa-asterisk" align="left" color="red" size='6' />
                                <Text text={"Description: "} />
                            </Label>
                            <TextArea value={description} reference={descRef} handleChange={descChange} />
                        </FormGroup>
                    )
                )
            }

            {/* Card */}
            {
                (
                    type === FormTypes.CreateTicket &&
                    (
                        <FormGroup>
                            <Label>
                                <Icon icon="fa fa-asterisk" align="left" color="red" size='6' />
                                <Text text={"Card: "} />
                            </Label>
                            <SelectBox value={card} reference={cardRef} handleChange={cardChange} cards={cardsList} />
                        </FormGroup>
                    )
                )
            }

            {/* Save and Cancel Buttons */}
            <ButtonGroup>
                {
                    (
                        type === FormTypes.CreateCard &&
                        <Button text="Save" width="auto" handleClick={handleCardSave} />
                    )
                }
                {
                    (
                        type === FormTypes.CreateTicket &&
                        <Button text="Save" width="auto" handleClick={handleTicketSave} />

                    )
                }
                {
                    (
                        type === FormTypes.EditTicket &&
                        <Button text="Update" width="auto" handleClick={() => handleTicketEdit(ticketId)} />

                    )
                }
                <Button text="Cancel" width="auto" margin="left" handleClick={handleCancel} />
            </ButtonGroup>
        </FormDiv>
    );
}

export default Form;