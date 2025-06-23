import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { Select as SelectField } from 'src/components/Select';

interface OptionType {
  value: string | number;
  label: string;
}

interface IProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  height?: 'lg' | 'sm';

  control?: Control<T>;
  name: FieldPath<T>;
  rules?: object;

  options: OptionType[];
  isdisabled?: boolean;

  helperText?: string;
  error?: boolean;
  required?: boolean;
  defaultValue?: OptionType;
}

export function ReactSelect<T extends FieldValues>(props: IProps<T>) {
  const { control, name, required, options, defaultValue, isdisabled, rules, error, helperText, height } = props;

  return (
    <>
      <section>
        <div>
          <Controller
            control={control}
            name={name}
            rules={{ required, ...rules }}
            render={({ field: { ...field } }) => {
              return (
                <>
                  <SelectField
                    value={options?.find((o: OptionType) => o.value === field.value)?.value || ''}
                    label={props?.label || ''}
                    options={options}
                    defaultValue={defaultValue?.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={isdisabled}
                    height={height}
                    required={props.required}
                    name={field.name}
                    onBlur={field.onBlur}
                  />
                </>
              );
            }}
          />
        </div>
        {error && (
          <span className={`${error ? 'text-sm text-gray-500' : 'text-surface-grey '} text-sm `}>
            {helperText}
          </span>
        )}
      </section>
    </>
  );
}

export default ReactSelect;
