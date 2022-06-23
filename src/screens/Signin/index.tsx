import React, { useState } from "react";
import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SigninTitle,
    Footer,
    FooterWrapper
} from "./styles";

import { ActivityIndicator, ActivityIndicatorBase, Alert, Platform } from "react-native";
import AppleSVG from '../../assets/apple.svg'
import GoogleSVG from '../../assets/google-icon.svg'
import LogoSVG from '../../assets/Finance.svg'
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { useTheme } from "styled-components";

export function Signin(){
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const {signInWithGoogle, signInWithApple} = useAuth()

    async function handleSignInWithGoogle(){
        try {
            setIsLoading(true)
            return await signInWithGoogle()
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel conectar a conta google')
            setIsLoading(false)
        }
    }
    
    async function handleSignInWithApple(){
        try {
            setIsLoading(true)
            return await signInWithApple()
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel conectar a conta google')
            setIsLoading(false)
        } 
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSVG width={RFValue(120)} height={RFValue(68)}/>
                    <Title>
                        Controle suas {'\n'} 
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SigninTitle>
                    Faça seu login com {'\n'} 
                    uma das contas abaixo
                </SigninTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                    title="Entrar com Google"
                    svg={GoogleSVG}
                    onPress={handleSignInWithGoogle}
                    />
                    {
                        Platform.OS === 'ios' &&
                        <SignInSocialButton
                            title="Entrar com Apple"
                            svg={AppleSVG}
                            onPress={handleSignInWithApple}
                        />
                    }
                </FooterWrapper>
                {
                    isLoading && <ActivityIndicator color={theme.colors.shape} style={{marginTop: 18}}/>
                }
            </Footer>
        </Container>
    )
}