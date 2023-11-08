import React from 'react';
import { Controller } from 'react-hook-form';
import { Animated, KeyboardTypeOptions, TextInput, TouchableOpacity, View } from 'react-native';
import { CloseCircleFillSvg } from '../../../icons';
import { FormContext } from '../../context';
import { theme } from '../../../../utils';

export interface TextFieldProps {
   name: string;
   iconLeft?: any;
   iconRight?: any;
   onSubmitEditing?: () => void;
   secureTextEntry?: boolean;
   height?: number;
   onChangeOver: (nextValue: string) => void;
   label?: string;
   keyboardType?: KeyboardTypeOptions;
   multiline?: boolean;
   disabled?: boolean;
   top?: number;
   autoFocus?: boolean;
   style: any;
   onFocusProps?: (event: any) => void;
}

const TextField = ({
   name,
   onSubmitEditing,
   secureTextEntry,
   onChangeOver,
   label,
   keyboardType,
   multiline,
   disabled,
   top,
   autoFocus,
   style,
   onFocusProps,
}: TextFieldProps) => {
   const { control, errors } = React.useContext(FormContext);
   const [isFocus, setIsFocus] = React.useState<boolean>(false);
   let refAnimatedLabel = React.useRef(new Animated.Value(8)).current;

   let refAnimatedLabelColor = React.useRef(new Animated.Value(0)).current;

   let refAnimatedLabelFonsize = React.useRef(new Animated.Value(14)).current;

   let refBorderColor = React.useRef(new Animated.Value(0)).current;
   let [input, setInput] =  React.useState('');
   const ref = React.useRef<any>();

   let color = refAnimatedLabelColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#9FB0C7', 'white'],
      extrapolate: 'clamp',
   });

   let borderColor = refBorderColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#E5EAF0', "#219B67"],
      extrapolate: 'clamp',
   });

   function onFocus(event: any) {
      Animated.timing(refAnimatedLabelFonsize, {
         toValue: 12,
         duration: 300,
         useNativeDriver: false,
      }).start();
      refAnimatedLabelColor.setValue(1);
      refBorderColor.setValue(1);
      setIsFocus(true);
      if (onFocusProps){
         onFocusProps(event);
      }
   }
   const viewLabel = (
     <Animated.Text
       style={{
         color: color,
         fontWeight: "400",
         fontSize: refAnimatedLabelFonsize,
         position: "absolute",
         top: refAnimatedLabel,
         left: 16,
       }}
     >
       {label}
     </Animated.Text>
   );

   function onChangeText(text: string){
      setInput(text);
   }

   return (
      <View style={style}>
         <Controller
            control={control}
            render={({ field: { value } }) => {
               function onBlur() {
                  if (!value) {
                     Animated.timing(refAnimatedLabel, {
                        toValue: 8,
                        duration: 300,
                        useNativeDriver: false,
                     }).start();
                     Animated.timing(refAnimatedLabelFonsize, {
                        toValue: 14,
                        duration: 300,
                        useNativeDriver: false,
                     }).start();
                  }
                  refAnimatedLabelColor.setValue(0);
                  refBorderColor.setValue(0);
                  setIsFocus(false);
               }

               return (
                  <Animated.View
                     style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: borderColor,
                        borderRadius: 8,
                        position: 'relative',
                        height: multiline ? 68 : 44,
                        backgroundColor: '#FFF',
                     }}
                  >
                     
                     {input && (
                        <TouchableOpacity
                           onPress={() => {
                              ref?.current?.clear();
					               setInput('');
                              onChangeOver('');
                              onChangeText('');
                           }}
                           style={{ position: 'absolute', right: 12, top: 6, zIndex: 999}}
                        >
                           <CloseCircleFillSvg />
                        </TouchableOpacity>
                     )}
                     {input == '' && viewLabel}

                     <TextInput
                        ref={ref}
                        value={value}
                        autoFocus={autoFocus}
                        onChangeText={(text) => {
                           onChangeOver(text);
                           onChangeText(text);
                        }}
                        style={{
                           width: '100%',
                           height: '100%',
                           paddingHorizontal: 16,
                           fontSize: 14,
                           lineHeight: 14,
                           fontWeight: '400',
                           textAlignVertical: 'top',
                           color: theme.colors['neutral-900'],
                        }}
                        autoCapitalize="none"
                        cursorColor={theme.colors['neutral-600']}
                        selectionColor={theme.colors['neutral-600']}
                        onFocus={(event: any) => onFocus(event)}
                        onBlur={() => onBlur()}
                        onSubmitEditing={onSubmitEditing}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        editable={!disabled}
                        multiline={multiline}
                     />
                  </Animated.View>
               );
            }}
            name={name}
         />
      </View>
   );
};

export default TextField;