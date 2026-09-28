"use client"
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectSeparator,
} from "@/components/ui/select"
import { ChevronDownIcon, Info, LucideIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { UseFormRegisterReturn } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { formatToHumanStyle, formatToSystemStyle } from "@repo/shared"
import { cn } from "cn";

type RefElement =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLButtonElement;


interface FieldProp {
    label: string;
    name?: string;
    value?: string;
    dateValue?: Date;
    defaultValue?: string
    orientation?: "vertical" | "horizontal"
    size?: "default" | "sm" | "lg"
    isRequired?: boolean;
    isTextarea?: boolean;
    isNumeric?: boolean;
    toolTipContent?: string;
    selectItems?: string[] | Record<string, string[]>;
    selectedValue?: string
    placeHolder?: string
    shadow?: boolean,
    bg?: boolean
    fieldIden?: string; // for matching fieldName for states. "useful for matching labels"
    registration?: UseFormRegisterReturn;
    onChange?: (value: string) => void; // For React hook form 
    onChangeState?: ((data: {
        field: string;
        value: string | Date | undefined | null; // Expanded to support dates and empty states
    }) => void);
    onBlur?: () => void;
    inputRef?: (element: RefElement | null) => void;
    isHighlight?: boolean;
    isDatePicker?: boolean;
    Icon?: LucideIcon;
    error?: string;
}

function FieldBox({
    label,
    defaultValue,
    orientation = "vertical",
    size = "default",
    value,
    dateValue,
    isRequired,
    isTextarea,
    isNumeric,
    toolTipContent,
    error,
    selectItems,
    selectedValue,
    placeHolder = "",
    shadow = false,
    bg = false,
    fieldIden,
    inputRef,
    Icon,
    registration,
    isHighlight,
    isDatePicker,
    onChange,
    onBlur,
    onChangeState,
}: FieldProp) {

    if (selectItems?.length && !fieldIden?.trim()) {
        return null;
    }
    const fieldId = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const selectTriggerSize = size === "sm" ? "sm" : "default";

    const labelSize = {
        sm: "text-xs",
        lg: "text-base",
        default: "text-sm",
    }[size] ?? "text-sm";

    const errorTextSize = {
        sm: "text-[10px]",
        lg: "text-sm",
        default: "text-xs",
    }[size] ?? "text-xs";

    // Building input props

    const inputProps = registration
        ? {
            ...registration,
            defaultValue,
        }
        : {
            ref: inputRef,
            defaultValue,
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const rawValue = e.target.value;

                const usableVal = isNumeric
                    ? rawValue.replace(/\D/g, "")
                    : rawValue;

                if (typeof onChangeState === "function") {
                    onChangeState({
                        field: fieldIden ?? "",
                        value: usableVal,
                    });
                } else {
                    onChange?.(usableVal);
                }
            },
            onBlur,
        };

    const textareaProps = registration
        ? {
            ...registration,
            defaultValue,
        }
        : {
            ref: inputRef,
            defaultValue,
            value,
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange?.(e.target.value),
            onBlur,
        };

    // Functions that solves race conditions validation problems of select. useful for validation on close
    // 1. Declare the ref at the top level of your component
    const valueHolderRef = React.useRef<string | undefined>(undefined);
    const onSelectChange = ({ caseValue, value }: { caseValue: "set" | "validate"; value?: string }): void => {
        if (caseValue === "set" && value) {
            valueHolderRef.current = value; // Update the ref's current value
            onChangeState?.({
                field: fieldIden ?? "",
                value,
            });
        } else if (caseValue === "validate") {
            if (valueHolderRef.current) {
                valueHolderRef.current = undefined;
            } else {
                onBlur?.();
            }
        }
    };

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            valueHolderRef.current = undefined;
        };
    }, []);

    return (
        <Field className="gap-2 flex flex-col gap-2" data-invalid={Boolean(error)}>
            <div className={cn(
                "flex gap-2 w-full",
                orientation === "vertical" ? "flex-col" : "flex-row"
            )}>
                {orientation === "vertical" ? (
                    <div className="flex items-center justify-between">
                        <FieldLabel htmlFor={fieldId} className={cn("flex items-center gap-1", labelSize, isHighlight && "animate-field-highlight")}>
                            {label}
                            {isRequired && <span className="font-medium text-red-500">*</span>}
                        </FieldLabel>
                        {toolTipContent && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <span className="cursor-pointer text-muted-foreground hover:text-foreground">
                                                <Info className="h-4 w-4" />
                                            </span>
                                        }
                                    />
                                    <TooltipContent side="right">
                                        <p>{toolTipContent}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                ) : (
                    <div className="flex shrink-0 items-center gap-2 min-w-[25%]">
                        {toolTipContent && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger
                                        render={
                                            <span className="cursor-pointer text-muted-foreground hover:text-foreground">
                                                <Info className="h-4 w-4" />
                                            </span>
                                        }
                                    />
                                    <TooltipContent side="right">
                                        <p>{toolTipContent}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                        <FieldLabel htmlFor={fieldId} className={cn("flex items-center gap-1", labelSize)}>
                            {label}:
                            {isRequired && <span className="font-medium text-red-500">*</span>}
                        </FieldLabel>
                    </div>
                )}

                {!selectItems && !isDatePicker && (
                    <>
                        {!isTextarea ? (
                            <div className="relative w-full">
                                {Icon && (
                                    <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                )}
                                <Input
                                    id={fieldId}
                                    shadow={shadow}
                                    bg={bg}
                                    className={Icon ? "pl-9" : ""}
                                    inputMode={isNumeric ? "numeric" : "text"}
                                    inputSize={size ?? "default"}
                                    aria-invalid={Boolean(error)}
                                    placeholder={placeHolder}
                                    {...inputProps}
                                />
                            </div>
                        ) : (
                            <Textarea
                                id={fieldId}
                                aria-invalid={Boolean(error)}
                                placeholder={placeHolder}
                                {...textareaProps}
                            />
                        )}
                    </>
                )}

                {selectItems && !isDatePicker &&  (
                    <Select
                        value={formatToHumanStyle(selectedValue ?? "")}
                        defaultValue={defaultValue}
                        onValueChange={(newValue) => {
                            const formattedValue = formatToSystemStyle(newValue ?? "");
                            onSelectChange({
                                caseValue: "set",
                                value: formattedValue
                            })
                        }}
                        onOpenChangeComplete={(open) => {
                            if (!open) {
                                onSelectChange({
                                    caseValue: "validate"
                                })
                            }
                        }}
                    >
                        <SelectTrigger ref={inputRef as React.Ref<HTMLButtonElement>} size={selectTriggerSize} id={fieldId} className="w-full" aria-invalid={Boolean(error)}>
                            <SelectValue placeholder={placeHolder || `Select ${label.toLowerCase()}`} />
                        </SelectTrigger>
                        {Array.isArray(selectItems) ? (
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{label}</SelectLabel>
                                    {selectItems.map((item) => (
                                        <SelectItem key={String(item)} value={String(item)}>
                                            {item}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        ) : (
                            <SelectContent>
                                {
                                    Object.entries(selectItems).map(([group, items], index, array) => (
                                        <React.Fragment key={group}>
                                            <SelectGroup>
                                                <SelectLabel>{group}</SelectLabel>
                                                {items.map((item) => (
                                                    <SelectItem key={item} value={item}>
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                            {index < array.length - 1 && <SelectSeparator />}
                                        </React.Fragment>
                                    ))
                                }
                            </SelectContent>
                        )}
                    </Select>
                )}

                {!selectItems && isDatePicker && (
                    <Popover>
                        <PopoverTrigger render={<Button variant={"outline"} data-empty={!value} className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground h-9">{dateValue ? formatToHumanStyle(dateValue) : <span>Pick a date</span>}<ChevronDownIcon data-icon="inline-end" /></Button>} />
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={dateValue}
                                onSelect={(value) => {
                                    onChangeState?.({
                                        field: fieldIden ?? "",
                                        value: value,
                                    });
                                }}
                                defaultMonth={dateValue}
                            />
                        </PopoverContent>
                    </Popover>
                )}
            </div>

            <FieldError className={errorTextSize}>{error}</FieldError>
        </Field>
    );
}

export { FieldBox }