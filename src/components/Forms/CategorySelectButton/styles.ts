import styled from "styled-components/native";
import {Feather} from '@expo/vector-icons'
import theme from "../../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";
import {RectButton} from 'react-native-gesture-handler'

export const Container = styled(RectButton).attrs({
    activeOpacity: 0.7
})`
    background-color: ${(theme.colors.shape)};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 18px 16px;
`;

export const Category = styled.Text`
    font-family: ${(theme.fonts.regular)};
    font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${(theme.colors.text)}
`;