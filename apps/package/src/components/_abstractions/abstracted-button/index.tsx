import type { FC } from "react";

export interface AbstractedButtonProps {
  title: string;
}

const AbstractedButton: FC<AbstractedButtonProps> = ({ title }) => {
  return (
    <div>
      <div>{title}</div>
    </div>
  );
};

export default AbstractedButton;
