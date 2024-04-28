export interface ITextField{
    textfieldKey: string
    icon: React.ReactNode
    placeholder?: string
    onChangeValue: (text:string) => void
    isPassword: boolean,
    value: string,
    readonly: boolean,
    isNumber?: boolean
}

export interface ITextArea{
    textfieldKey: string
    placeholder?: string
    onChangeValue: (text:string) => void
    value: string,
    readonly: boolean
}