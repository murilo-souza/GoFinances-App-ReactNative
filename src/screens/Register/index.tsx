import React, {useState} from "react";
import { Button } from "../../components/Forms/Button";
import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { 
    Container, 
    Header, 
    Title,
    Form,
    Fields,
    TransactionsTypes
} from "./styles";

export function Register(){
    const [transactionsType, setTransactionType] = useState('')

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Preço"
                    />
                    <TransactionsTypes>
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            isActive={transactionsType === 'up'}
                            onPress={() => handleTransactionTypeSelect('up')}
                        />
                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            isActive = {transactionsType === 'down'}
                            onPress={() => handleTransactionTypeSelect('down')}
                        />
                    </TransactionsTypes>
                    <CategorySelect
                        title="Categoria"
                    />
                </Fields>
                <Button
                    title="Enviar"
                />
            </Form>
        </Container>
    );
}