import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";
import {BorderlessButton} from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'

export const Container = styled.View`
    background-color: ${(theme.colors.background)};
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${(theme.colors.primary)};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${(theme.fonts.regular)};
    font-size: ${RFValue(18)}px;
    color: ${(theme.colors.shape)};

`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const MonthSelect = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-family: ${theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
     flex: 1;
    justify-content: center;
    align-items: center;
`;