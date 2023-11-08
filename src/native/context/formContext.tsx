import React, { ReactNode } from "react";
import { Control, FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";

export interface FormContextProviderProps<TFieldValues extends FieldValues = FieldValues> {
	control?: Control<TFieldValues>;
	errors: FieldErrors<TFieldValues>;
	children?: ReactNode;
	setValue?: UseFormSetValue<TFieldValues>;
	watch?: (name: keyof TFieldValues) => TFieldValues[keyof TFieldValues];
	handleCloseBottom?: () => void;
}

export const FormContext = React.createContext<FormContextProviderProps>({
	errors: {},
});

const FormContextProvider = <TFieldValues extends FieldValues = FieldValues>({
	children,
	control,
	errors,
	setValue,
	watch,
	handleCloseBottom,
}: FormContextProviderProps<TFieldValues>) => {
	const newControl: any = control;
	const newSetValue: any = setValue;
	return (
		<FormContext.Provider value={{ control: newControl, errors, setValue: newSetValue, watch, handleCloseBottom }}>
			{children}
		</FormContext.Provider>
	);
};

export default FormContextProvider;
