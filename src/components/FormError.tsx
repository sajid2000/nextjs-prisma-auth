import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface Props {
  message?: string;
}

const FormError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive dark:text-red-500">
      <ExclamationTriangleIcon className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
