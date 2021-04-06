import React from 'react';
import { FormTypes } from '../../constants';
import { useFormContext } from '../../contexts/FormContext';
import { getData } from '../../utils';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import SelectBox from '../SelectBox/SelectBox';
import Text from '../Text/Text';
import TextArea from '../TextArea/TextArea';
import { ButtonGroup, FormDiv, FormGroup, Label } from './Style';

interface FormProps {
    titleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    descChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    cardChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCardSave: React.MouseEventHandler<HTMLButtonElement>;
    handleTicketSave: React.MouseEventHandler<HTMLButtonElement>;
    handleTicketEdit: (id: string) => void;
    handleCancel: React.MouseEventHandler<HTMLButtonElement>;
}

const Form: React.FC<FormProps> = ({ titleChange, descChange, cardChange, handleCardSave, handleTicketSave, handleTicketEdit, handleCancel }) => {
    const { cards: cardsList } = getData();
    const { formState } = useFormContext();

    return (
        <FormDiv>
            {/* Title */}
            <FormGroup>
                <Label>
                    <Icon icon="fa fa-asterisk" align="left" color="red" size='6' />
                    <Text text={"Title: "} />
                </Label>
                <Input value={formState.title} handleChange={titleChange} />
            </FormGroup>

            {/* Description */}
            {
                (
                    (formState.type === FormTypes.CreateTicket || formState.type === FormTypes.EditTicket) &&
                    (
                        <FormGroup>
                            <Label>
                                <Icon icon="fa fa-asterisk" align="left" color="red" size='6' />
                                <Text text={"Description: "} />
                            </Label>
                            <TextArea value={formState.description} handleChange={descChange} />
                        </FormGroup>
                    )
                )
            }

            {/* Card */}
            {
                (
                    formState.type === FormTypes.CreateTicket &&
                    (
                        <FormGroup>
                            <Label>
                                <Icon icon="fa fa-asterisk" align="left" color="red" size='6' />
                                <Text text={"Card: "} />
                            </Label>
                            <SelectBox value={formState.card} handleChange={cardChange} cards={cardsList} />
                        </FormGroup>
                    )
                )
            }

            {/* Save and Cancel Buttons */}
            <ButtonGroup>
                {
                    (
                        formState.type === FormTypes.CreateCard &&
                        <Button text="Save" width="auto" handleClick={handleCardSave} />
                    )
                }
                {
                    (
                        formState.type === FormTypes.CreateTicket &&
                        <Button text="Save" width="auto" handleClick={handleTicketSave} />

                    )
                }
                {
                    (
                        formState.type === FormTypes.EditTicket &&
                        <Button text="Update" width="auto" handleClick={() => handleTicketEdit(formState.ticketId)} />

                    )
                }
                <Button text="Cancel" width="auto" margin="left" handleClick={handleCancel} />
            </ButtonGroup>
        </FormDiv>
    );
}

export default Form;