import React, {useState} from "react";
import {Modal} from 'react-native'
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { 
    Container, 
    Header, 
    Title,
    Form,
    Fields,
    TransactionsTypes
} from "./styles";

export function Register(){
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });
    const [transactionsType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen]= useState(false)

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
    }

    function handleCloseCategorySelectModal(){
        setCategoryModalOpen(false)
    }


    function handleOpenCategorySelectModal(){
        setCategoryModalOpen(true)
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
                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenCategorySelectModal}
                    />
                </Fields>
                <Button
                    title="Enviar"
                />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseCategorySelectModal}
                />
            </Modal>
        </Container>
    );
}