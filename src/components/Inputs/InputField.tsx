import { ChangeEvent } from "react";
import className from 'classnames'

interface IInputField {
  description?: string;
  error?: boolean;
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  placeholder: string
  type?: string;
}

export default function InputField({ description, error, label, name, onChange, placeholder, type }: IInputField) {
  return (
    <div className="max-w-sm w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          className={className(
            "bg-gray-400 shadow-sm focus:ring-pink-200 focus:border-pink-300 block w-full sm:text-sm rounded-md",
            error ? "border-blue-100" : "border-pink-100")}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />
      </div>
      {!!description &&
        <div className="mt-1 text-gray-500 text-xs">
          <span>{description}</span>
        </div>
      }
    </div>
  )
}
