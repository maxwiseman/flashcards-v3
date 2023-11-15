import { cloneElement, type ReactElement } from "react";
import { type UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

export function Setting({
  form,
  name,
  label,
  children,
  description,
  placeholder,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This should be fine
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  children: ReactElement;
  description?: string;
  placeholder?: string;
}): React.ReactElement {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            {cloneElement(children, { placeholder, ...field })}
          </FormControl>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
