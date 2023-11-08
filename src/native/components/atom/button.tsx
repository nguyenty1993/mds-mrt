import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  height: 44px;
  padding-vertical: 10px;
  border-radius: 8px;
  width: ${props => props.width };
  background-color: ${props => props.bgColor};
  border-width: 1px;
  border-color: ${props => props.borderColor};; 
  border-style: solid;
`;

const ButtonText = styled.Text<ButtonProps>`
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  color: ${props => props.textColor};
`;

export interface ButtonProps {
    onPress?: () => void;
    title?: string;
    bgColor?: string;
    width?: string;
    style?: any;
    textColor?: string;
    borderColor?: string;
    disabled?: boolean;
 }

 const Button = ({ onPress, title, bgColor, width, style, textColor, borderColor, disabled }: ButtonProps) => (
   <ButtonContainer
     style={style}
     onPress={onPress}
     bgColor={bgColor ? bgColor : "#219B67"}
     width={width ? width : "100%"}
     borderColor={borderColor ? borderColor : 'transparent'}
     disabled={disabled ? disabled : false}
   >
     <ButtonText textColor={textColor ? textColor: 'white'}>{title}</ButtonText>
   </ButtonContainer>
 );

export default Button;