"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CalendarDays, Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FieldBox } from "@/components/FieldBox";

type Priority = "low" | "medium" | "high";


type PlanFormValues = {
    title: string;
    label: "Monthly" | "Weekly";
    targetAmount: string;
    priority: Priority;
    targetDate: string;
    needs: {
        category: NeedCategory;
        amount: string;
        description: string;
        priority: Priority;
    }[];
};


interface NeedItem {
    category: NeedCategory;
    amount: string;
    description: string;
    priority: string;
    isActive: boolean;
}


// Define strict types for categories and needs
type NeedCategory = "food" | "rent" | "activities" | "study" | "clothes" | "gym" | "others";

interface NeedItem {
    category: NeedCategory;
    amount: string;
    description: string;
    priority: string;
    isActive: boolean;
}


const NEED_OPTIONS: NeedCategory[] = [
    "food",
    "rent",
    "activities",
    "study",
    "clothes",
    "gym",
    "others",
];

const fieldClassName =
    "h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-none outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30";


interface FormState {
    targetDate: Date | null | undefined;
}

function PrioritySelect({
    id,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { id: string }) {
    return (
        <select id={id} className={`${fieldClassName} w-full capitalize`} {...props}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
    );
}

export default function Page() {
    const [categoryToAdd, setCategoryToAdd] = useState("");
    const [submitted, setSubmitted] = useState(false);
    // State to manage dialog visibility and needs array with active status
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [needs, setNeeds] = useState<NeedItem[]>([]);

    const [stateDate, setStateData] = useState<FormState>({
        targetDate: null,
    });
    const {
        register,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<PlanFormValues>({
        defaultValues: {
            title: "",
            label: "Monthly",
            targetAmount: "",
            priority: "medium",
            targetDate: "",
            needs: [],
        },
    });

    const onSubmit = handleSubmit(() => setSubmitted(true));

    const onChangeStatefulData = ({ field, value }: {
        field: string;
        value: string | Date | null | undefined; // Expanded to match FieldBox requirements
    }): void => {
        setStateData((prev) => ({
            ...prev,
            [field]: value
        }));
    };


    // Toggle need selection: adds if new, or toggles isActive state while preserving data
    const handleToggleNeed = (category: NeedCategory) => {
        setNeeds((prevNeeds) => {
            const existingIndex = prevNeeds.findIndex((n) => n.category === category);
            if (existingIndex > -1) {
                const updated = [...prevNeeds];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    isActive: !updated[existingIndex].isActive,
                };
                return updated;
            } else {
                return [
                    ...prevNeeds,
                    {
                        category,
                        amount: "",
                        description: "",
                        priority: "Medium",
                        isActive: true,
                    },
                ];
            }
        });
    };

    return (
        <form className="space-y-8 container" noValidate>
            {/* Section One */}
            <section aria-labelledby="plan-details-heading" className="space-y-5">
                <h2 id="plan-details-heading" className="text-base font-semibold">
                    Plan details
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                    <FieldBox
                        label="Title"
                        placeHolder="Add Title"
                        isRequired
                        error={errors.title?.message}
                        registration={{ ...register("title") }}
                    />

                    <FieldBox
                        label="Plan Label"
                        fieldIden="planLabel"
                        error={errors.label?.message}
                        registration={{ ...register("label") }}
                        selectItems={["Monthly", "Weekly", "Yearly"]}
                    />

                    <FieldBox
                        label="Target amount"
                        fieldIden="targetAmount"
                        placeHolder="0.00"
                        isNumeric
                        error={errors.targetAmount?.message}
                        registration={{ ...register("targetAmount") }}
                    />

                    <FieldBox
                        label="Priority"
                        fieldIden="priority"
                        error={errors.priority?.message}
                        registration={{ ...register("priority") }}
                        selectItems={["High", "Medium", "Low"]}
                    />

                    <FieldBox
                        label="Target Date"
                        fieldIden="targetDate"
                        isDatePicker
                        error={errors.targetDate?.message}
                    />
                </div>
            </section>

            {/* --- ADD NEED SECTION & SHADCN DIALOG --- */}
            <section className="space-y-5 pt-4 border-t">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold">Needs</h2>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger render={
                            <Button type="button" variant="outline">
                                Add Need
                            </Button>
                        }>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Questionnaire: Select Need</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-3 py-4">
                                {NEED_OPTIONS.map((option) => {
                                    const currentNeed = needs.find((n) => n.category === option);
                                    const isActive = currentNeed ? currentNeed.isActive : false;

                                    return (
                                        <Button
                                            key={option}
                                            type="button"
                                            variant={isActive ? "default" : "outline"}
                                            className="justify-start capitalize"
                                            onClick={() => handleToggleNeed(option)}
                                        >
                                            {option}
                                            {isActive && (
                                                <span className="ml-auto text-xs bg-primary-foreground text-primary px-1.5 py-0.5 rounded">
                                                    Active
                                                </span>
                                            )}
                                        </Button>
                                    );
                                })}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Dynamic Form Sections for Active Needs */}
                {needs
                    .map((need, originalIndex) => ({ ...need, originalIndex }))
                    .filter((need) => need.isActive)
                    .map((need) => {
                        const idx = need.originalIndex;
                        return (
                            <div
                                key={need.category}
                                className="space-y-5 p-5 border rounded-lg bg-muted/20 relative"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold capitalize">
                                        {need.category} Need Details
                                    </h3>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 h-8 px-2"
                                        onClick={() => handleToggleNeed(need.category)}
                                    >
                                        Remove
                                    </Button>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <FieldBox
                                        label="Amount"
                                        fieldIden={`needs_${idx}_amount`}
                                        placeHolder="0.00"
                                        isNumeric
                                        registration={{ ...register(`needs.${idx}.amount`) }}
                                    />
                                    <FieldBox
                                        label="Priority"
                                        fieldIden={`needs_${idx}_priority`}
                                        registration={{ ...register(`needs.${idx}.priority`) }}
                                        selectItems={["High", "Medium", "Low"]}
                                    />


                                    <FieldBox
                                        label="Description"
                                        isTextarea
                                        fieldIden={`needs_${idx}_description`}
                                        placeHolder="Add description"
                                        registration={{ ...register(`needs.${idx}.description`) }}
                                    />

                                </div>
                            </div>
                        );
                    })}
            </section>

            <Button type="submit">Save Plan</Button>
        </form>
    );
}
