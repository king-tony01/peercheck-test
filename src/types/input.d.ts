interface SearchInputProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  shrink?: boolean;
}

interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface DropdownInputProps {
  options: DropdownOption[];
  selectedOption?: DropdownOption;
  onSelect?: (option: DropdownOption) => void;
  type: "primary" | "secondary";
  position?:
    | "left"
    | "right"
    | "center"
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
}
interface ActionDropdownProps {
  options: DropdownOption[];
  clickedChild?: DropdownOption;
  onChildClick?: (option?: DropdownOption) => void;
  type: "primary" | "secondary";
  position?:
    | "left"
    | "right"
    | "center"
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  customIcon?: React.ReactNode;
}

interface TextInputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  type?: "text" | "password" | "email" | "number";
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  className?: string;
  style?: React.CSSProperties;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  error?: string;
  warning?: string;
  label?: string;
  helperText?: string;
}

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  error?: string;
  helperText?: string;
}
