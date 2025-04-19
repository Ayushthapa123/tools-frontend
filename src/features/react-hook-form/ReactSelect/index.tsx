import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import Select, { Props } from 'react-select';

interface IProps<T extends FieldValues> extends Props {
  label?: string;
  placeholder?: string;
  height?:'lg' | 'sm'

  control?: Control<T>;
  name: FieldPath<T>;
  rules?: object;

  options: any;
  isdisabled?: boolean;

  helperText?: string;
  error?: boolean;
}

export function ReactSelect<T extends FieldValues>(props: IProps<T>) {
  const {
    control,
    name,
    required,
    options,
    isdisabled,
    rules,
    error,
    helperText,
    height
  } = props;
  // const { errors } = useFormState<T>({ control, name })

  return (
    <>
      <section>
        <div>
          {props.label && (
            <label
              htmlFor={props.name}
              className="text-sm font-semibold text-gray-600"
            >
              {props.label}{' '}
              {props.required && <span className="text-red-500">*</span>}
            </label>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name={name}
            rules={{ required, ...rules }}
            render={({ field: { ...field } }) => {
              return (
                <>
                  <Select
                    value={options?.find(
                      (o: { value: object }) => o.value === field.value,
                    )}
                    // className='border-[1.5px] border-[#B6C2E2] peer border-solid rounded  flex focus:border-primary-light-main focus:outline-primary-light-main placeholder-shown:bg-white-default hover:border-primary-light-main hover:bg-white focus-within:border-primary-light-main focus-within:outline-primary-light-main focus-within:bg-white-default relative w-full'

                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        height: height==='lg'?'3rem':'2.7rem',
                        border: '1.5px solid #B6C2E2',
                      }),
                    }}
                    instanceId="long-value-select"
                    defaultValue={{ label: props.placeholder, value: '' }}
                    classNamePrefix="addl-class"
                    options={options}
                    onChange={(name) => field.onChange(name?.value)}
                    isDisabled={isdisabled}
                  />
                </>
              );
            }}
          />{' '}
        </div>
        {error && (
          <span
            className={`${
              error ? 'text-gray-500 text-sm' : 'text-surface-grey '
            } text-sm `}
          >
            {helperText}
          </span>
        )}{' '}
      </section>
    </>
  );
}

export default ReactSelect;
