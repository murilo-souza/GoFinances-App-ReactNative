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
    Title
} from './styles'
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";


export function Dashboard(){
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
                <TransactionCard/>
            </Transactions>
        </Container>
    );
}