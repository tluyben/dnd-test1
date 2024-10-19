import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface AccordionProps extends AccordionPrimitive.AccordionProps {
  children: React.ReactNode;
}

const Accordion = ({
  children,
  className,
  ...props
}: AccordionProps & { className?: string }) => {
  return (
    <AccordionPrimitive.Root className={clsx("w-full", className)} {...props}>
      {children}
    </AccordionPrimitive.Root>
  );
};

interface AccordionItemProps extends AccordionPrimitive.AccordionItemProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={clsx("border-b", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  )
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps
  extends AccordionPrimitive.AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={clsx(
        "flex flex-1 items-center justify-between py-2 text-left font-medium focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="h-4 w-4 transition-transform duration-200"
        aria-hidden
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps
  extends AccordionPrimitive.AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={clsx("overflow-hidden text-sm", className)}
    {...props}
  >
    <div className="pb-2">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
