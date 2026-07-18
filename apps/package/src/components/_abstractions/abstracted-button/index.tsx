import type { ButtonHTMLAttributes, ReactNode, FC } from "react";

interface AbstractedButtonSlots {
  content?: string;
  loading?: string;
  root?: string;
}
export interface AbstractedButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "disabled"
> {
  loadingBehavior?: "overlay" | "replace" | "prepend" | "append";
  keepContentVisibleWhileLoading?: boolean;
  spinnerPlacement?: "start" | "end";
  slots?: AbstractedButtonSlots;
  disableWhenLoading?: boolean;
  loadingElement?: ReactNode;
  loadingDelay?: number;
  children?: ReactNode;
  isDisabled?: boolean;
  loadingText?: string;
  isLoading?: boolean;
  asChild?: boolean;
}
const AbstractedButton: FC<AbstractedButtonProps> = ({ title }) => {
  return (
    <div>
      <div>{title}</div>
    </div>
  );
};

export default AbstractedButton;
