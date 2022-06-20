import React, {useEffect, useState} from "react";
import {Alert, Modal} from 'react-native'
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form"; 
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import {useNavigation} from '@react-navigation/native'


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

type NavigationProps = {
    navigate: (screen: string)=> void;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

export function Register(){
    const navigation = useNavigation<NavigationProps>()
    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
    });
    const [transactionsType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen]= useState(false)
    

    function handleTransactionTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type)
    }

    function handleCloseCategorySelectModal(){
        setCategoryModalOpen(false)
    }


    function handleOpenCategorySelectModal(){
        setCategoryModalOpen(true)
    }

    async function handleRegister(form: any){
        if(!transactionsType)
            return Alert.alert("Selecione o tipo da transação")

        if(category.key === 'category')
            return Alert.alert("Selecione a categoria")


        const NewTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionsType,
            category: category.key,
            date: new Date()
        }
        
        try {
            const dataKey = '@gofinances:transactions';
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : []

            const dataFormatted = [
                ...currentData,
                NewTransaction
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            });
            navigation.navigate('Listagem')


        }catch(error){
            console.log(error)
            Alert.alert("Não foi possível salvar");
        }

    }


    const {control, handleSubmit, reset, formState: {errors}} = useForm({resolver: yupResolver(schema)})

    return(
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
                            isActive={transactionsType === 'positive'}
                            onPress={() => handleTransactionTypeSelect('positive')}
                            />
                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            isActive = {transactionsType === 'negative'}
                            onPress={() => handleTransactionTypeSelect('negative')}
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
    );
}