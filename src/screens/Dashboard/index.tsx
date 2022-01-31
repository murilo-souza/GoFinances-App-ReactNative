import React from "react";
import {StatusBar} from 'expo-status-bar'

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
    TransactionList
} from './styles'
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import { getBottomSpace } from "react-native-iphone-x-helper";


export function Dashboard(){
    const data = [
        {
            title: "Dev de site",
            amount: "R$ 17.000,00",
            category:{
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date:"13/02/2022",
        },
        {
            title: "Dev de site",
            amount: "R$ 17.000,00",
            category:{
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date:"13/02/2022",
        },
        {
            title: "Dev de site",
            amount: "R$ 17.000,00",
            category:{
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date:"13/02/2022",
        },
    ]

    return (
        <Container>
            <StatusBar style='light'/>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://github.com/murilo-souza.png'}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Murilo</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
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
                    renderItem={({item})=><TransactionCard data={item}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: getBottomSpace() + 12
                    }}
                />
            </Transactions>
        </Container>
    );
}