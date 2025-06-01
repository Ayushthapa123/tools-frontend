import { Control, Controller } from 'react-hook-form';

interface DatePickerProps {
  name: string;
  control: Control<any>;
  label: string;
}

const DatePicker = ({ name, control, label }: DatePickerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
          <input
            type="date"
            value={value ? new Date(value).toISOString().split('T')[0] : ''}
            onChange={e => onChange(e.target.value ? new Date(e.target.value) : null)}
            className="focus:border-blue-500 focus:ring-blue-500 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      )}
    />
  );
};

export default DatePicker;
