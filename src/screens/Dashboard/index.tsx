import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {ActivityIndicator} from 'react-native'

import { useTheme } from "styled-components";

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
    LogoutButton,
    LoadContainer
} from './styles'
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";


export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}
interface HighlightData{
    entries: HighlightProps
    expensives: HighlightProps
    total: HighlightProps

}

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [hightlightData, setHightlightData] = useState<HighlightData>({} as HighlightData)
    const theme = useTheme()


    function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative'){

        const lastTransaction = Math.max.apply(Math, collection
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date(transaction.date).getTime()))
        
        return Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long',
        }).format(new Date(lastTransaction))
    }


    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response) : []

        let entriesTotal = 0;
        let expensiveTotal = 0;


        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps)=>{

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount)
            }else {
                expensiveTotal += Number(item.amount)
            }

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

        setTransactions(transactionsFormatted)

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
        const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative')
        const totalInterval = `01 a ${lastTransactionExpensive}`;

        const total = entriesTotal-expensiveTotal

        setHightlightData({
            entries:{
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: `Última saida dia ${lastTransactionExpensive}`,
            },

            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: totalInterval,
            }

        })

        setIsLoading(false);

    }

    useEffect(()=>{
        loadTransactions()
    },[])

    useFocusEffect(useCallback(()=>{
        loadTransactions()
    }, []))

    return (
        <Container>
            
            {
                isLoading ? 
                    <LoadContainer>
                        <ActivityIndicator color={theme.colors.primary} size="large"/>
                    </LoadContainer> :
                <>
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
                        <HighlightCard title='Entradas' amount={hightlightData.entries.amount} lastTransaction={hightlightData.entries.lastTransaction} type="up"/>
                        <HighlightCard title='Saida' amount={hightlightData.expensives.amount} lastTransaction={hightlightData.expensives.lastTransaction} type="down"/>
                        <HighlightCard title='Total' amount={hightlightData.total.amount} lastTransaction={hightlightData.total.lastTransaction} type="total" />
                    </HighlightCards>
                    <Transactions>
                        <Title>Listagem</Title>

                        <TransactionList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({item})=><TransactionCard data={item}/>}
                            
                        />
                    </Transactions>
                </>
            }
        </Container>
    );
}