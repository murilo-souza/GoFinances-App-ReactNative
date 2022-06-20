import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from './styles'
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";


export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard(){
    const [data, setData] = useState<DataListProps[]>([])

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response) : []

        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps)=>{
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }).format(new Date(item.date))

            return{
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }

        });

        setData(transactionsFormatted)

    }

    useEffect(()=>{
        loadTransactions()
    },[])

    useFocusEffect(useCallback(()=>{
        loadTransactions()
    }, []))

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://github.com/murilo-souza.png'}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Murilo</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={()=>{}}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard title='Entradas' amount='R$ 17.000,00' lastTransaction='Última entrada dia 13 abril' type="up"/>
                <HighlightCard title='Saida' amount='R$ 17.000,00' lastTransaction='Última saida dia 13 abril' type="down"/>
                <HighlightCard title='Total' amount='R$ 17.000,00' lastTransaction='Dia 13 de abril' type="total" />
            </HighlightCards>
            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item})=><TransactionCard data={item}/>}
                    
                />
            </Transactions>
        </Container>
    );
}