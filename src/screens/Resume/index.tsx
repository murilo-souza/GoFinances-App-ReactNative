import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, Content, ChartContainer } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import {VictoryPie} from 'victory-native'
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

interface TransactionData {
    type : 'positive' | 'negative'
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData{
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume(){
    const [totalByCategories, setTotalCategories] = useState<CategoryData[]>([])

    const theme = useTheme()

    async function loadData(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter((expensive: TransactionData)=> expensive.type === 'negative')

        const expensiveTotal = expensives
        .reduce((accumulator: number, expensive:TransactionData)=>{
            return accumulator + Number(expensive.amount)
        }, 0)

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category =>{
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) =>{
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount);
                }
            });

            if(categorySum > 0){
                const totalFormatted = categorySum
                .toLocaleString('pt-BR', {
                    style:'currency',
                    currency: 'BRL',
                })

                const percent = `${(categorySum/expensiveTotal * 100).toFixed(0)}%`

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
                })
            }
        })

        setTotalCategories(totalByCategory)

    }

    useEffect(()=> {
        loadData()
    })
    
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <Content>
                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape
                            }
                        }}
                        labelRadius={50}
                        colorScale={totalByCategories.map(category => category.color)}
                        x="percent"
                        y="total"
                    />
                </ChartContainer>

                {
                    totalByCategories.map(item =>(
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.totalFormatted}
                            color={item.color} 
                        />
                        ))
                }
            </Content>

        </Container>
    );
}