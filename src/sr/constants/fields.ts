type Field = {
  id?: string;
  labelKey?: string;
  name: any;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  wrapperLabel?: string;
  topLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type FieldsArray = Field[];

export type ExtractFieldNames<T extends FieldsArray> = {
  [K in keyof T]: T[K] extends {type: 'dropdown'}
    ? T[K] extends {label: infer U}
      ? U
      : never
    : T[K] extends {name: infer U}
    ? U
    : never
}[number]
