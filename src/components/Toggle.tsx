import { Control, Controller } from "react-hook-form";

interface ToggleProps {
  name: string;
  control: Control<any>;
  label: string;
  className?: string;
}

export const Toggle = ({ name, control, label, className = "" }: ToggleProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className={`form-control ${className}`}>
          <label className="label cursor-pointer justify-start gap-2">
            <span className="label-text font-medium">{label}</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          </label>
        </div>
      )}
    />
  );
};

export default Toggle; 