import React, {useState} from "react";
import {Alert, Keyboard, Modal, TouchableWithoutFeedback} from 'react-native'
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form"; 
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'



import { 
    Container, 
    Header, 
    Title,
    Form,
    Fields,
    TransactionsTypes
} from "./styles";


interface FormData {
    name: string;
    amount: string
}


const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

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

    function handleRegister(form: FormData){
        if(!transactionsType)
            return Alert.alert("Selecione o tipo da transação")

        if(category.key === 'category')
            return Alert.alert("Selecione a categoria")


        const data = {
            name: form.name,
            amount: form.amount,
            transactionsType,
            category: category.key
        }
        console.log(data)
    }

    const {control, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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
                        onPress={handleSubmit(handleRegister)}
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
        </TouchableWithoutFeedback>
    );
}