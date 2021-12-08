import React, { useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

import { useForm } from "react-hook-form";
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTipes
} from './styles'

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('Valor é obrigatório'),
});

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const dataKey = '@ficont:transactions' 
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const { navigate }:NavigationProp<ParamListBase> = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type)
    }
    
    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData){
        if(!transactionType){
            return Alert.alert('Selecione o tipo da transação');
        }

        if(category.key === 'category' ){
            return Alert.alert('Selecione a categoria');
        }

        // const type = transactionType === 'positive' ? 'positive' : 'negative'

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date(),
        }

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                newTransaction,
                ...currentData
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('')
            setCategory({
                key: 'category',
                name: 'Categoria'
            })

            navigate('Listagem');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }

    // useEffect(()=> {
    //     async function loadData(){
    //         const data = await AsyncStorage.getItem(dataKey);

    //         console.log(JSON.parse(data!))
    //     }

    //     loadData()

        // async function removeAll() {
        //     await AsyncStorage.removeItem(dataKey);
        // }

        // removeAll()
    // },[])

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

                        <TransactionsTipes >                    
                            <TransactionTypeButton 
                                title="Income"
                                type="up"
                                onPress={() => handleTransactionTypeSelect('positive')}
                                isActive={ transactionType === 'positive' }
                            />
                            <TransactionTypeButton
                                title="Outcome"
                                type="down"
                                onPress={() => handleTransactionTypeSelect('negative')}
                                isActive={ transactionType === 'negative' }
                            />
                        </ TransactionsTipes>

                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                        
                    </ Fields> 

                    <Button 
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />

                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}