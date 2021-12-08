import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
    Container,
    Header,
    UserInfo,
    Photo,
    UserWrapper,
    User,
    UserGreeting,
    UserName,
    HighlighCards,
    Transactions,
    Title,
    Icon,
    TransactionsList,
    LogoutButton,
    LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData{
    entries: HighlightProps,
    expense: HighlightProps,
    total: HighlightProps
}

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions,setTransactions] = useState<DataListProps[]>();
    const [highlightData,setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    function getLastTransactionDate( 
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ){
        
        const lastTransaction = new Date(
            Math.max.apply(Math, collection
                .filter((transaction ) => transaction.type === type )
                .map(( transaction ) => new Date(transaction.date).getTime())
            )
        )

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;

        // return Intl.DateTimeFormat('pt-BR',{
        //         day: '2-digit',
        //         month: '2-digit',
        //         year: '2-digit',
        //     }).format(
        //         new Date(lastTransaction)
        //     )
    }

    async function loadTransactions(){
        const dataKey = '@ficont:transactions';
        
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesSum = 0;
        let expenseSum = 0;
        
        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if(item.type === 'positive' ){
                entriesSum += Number(item.amount);
            } else {
                expenseSum += Number(item.amount);
            }
            
            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR',{
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }

        });

        setTransactions(transactionsFormatted);

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive' )
        const lastTransactionExpenses = getLastTransactionDate(transactions, 'negative' )
        const totalInterval = `01 a ${lastTransactionEntries}`

        const total = entriesSum - expenseSum

        setHighlightData({
            entries:{
                amount: entriesSum.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`
            },
            expense:{
                amount: expenseSum.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastTransactionExpenses}`
            },
            total: {
                amount: total.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        })

        // console.log(transactionsFormatted);

        setIsLoading(false);
    }

    useEffect(()=>{
        loadTransactions()
    },[])

    useFocusEffect(useCallback(()=> {
        loadTransactions();
    },[]));

    return (
        <Container>
            {
            isLoading ? 
                <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary} 
                        size="large"
                    />

                </LoadContainer> 
            :
                <>
                    <Header>
                        <UserWrapper> 
                            <UserInfo>
                                <Photo 
                                    source={{ uri: 'https://penser.com.br/wp-content/uploads/2018/06/bom-exemplo-foto-para-linkedin.png' }} 
                                />
                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>Felipe</UserName>
                                </User>
                            </UserInfo>
                            
                            <LogoutButton onPress={() => {}} >
                                <Icon name="power" />
                            </LogoutButton>

                        </UserWrapper>
                    </Header>
                    
                    <HighlighCards>
                        <HighlightCard 
                            type="up"
                            title="Entradas"
                            amount={highlightData.entries.amount}
                            lastTransaction={highlightData.entries.lastTransaction}
                        />
                        <HighlightCard
                            type="down"
                            title="Saídas"
                            amount={highlightData.expense.amount}
                            lastTransaction={highlightData.expense.lastTransaction}
                        />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            lastTransaction={highlightData.total.lastTransaction}
                        />
                    </HighlighCards>

                    <Transactions>
                        <Title>Listagem</Title>

                        <TransactionsList 
                            data={transactions}
                            keyExtractor={ item => item.id }
                            renderItem={({ item }) => <TransactionCard data={item} /> }
                        />

                    </Transactions>
                </>
            }
        </Container>
    )
}
