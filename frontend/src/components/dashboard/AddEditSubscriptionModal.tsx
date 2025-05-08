import React from 'react';
import { CalendarIcon, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import axios from 'axios';

interface AddEditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subscriptionToEdit?: any; // Replace with your subscription type
}

// Define subscription schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Subscription name is required" }),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  billingCycle: z.enum(["monthly", "yearly"]),
  nextBillingDate: z.date({ required_error: "A date is required" }),
  category: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CATEGORIES = [
  'Entertainment',
  'Work Tools',
  'Personal',
  'Shopping',
  'Utilities',
  'Food & Drink',
  'Health & Fitness',
  'Other'
];

const AddEditSubscriptionModal = ({ isOpen, onClose, onSuccess, subscriptionToEdit }: AddEditSubscriptionModalProps) => {
  const isEditing = !!subscriptionToEdit;
  
  const defaultValues: Partial<FormValues> = {
    name: subscriptionToEdit?.name || '',
    amount: subscriptionToEdit?.amount || undefined,
    billingCycle: subscriptionToEdit?.billingCycle || 'monthly',
    nextBillingDate: subscriptionToEdit?.nextBillingDate ? new Date(subscriptionToEdit.nextBillingDate) : new Date(),
    category: subscriptionToEdit?.category || undefined,
    notes: subscriptionToEdit?.notes || '',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    const token = localStorage.getItem('auth_token');
    // Map frontend fields to backend fields
    const payload = {
      name: data.name,
      price: data.amount,
      cycle: data.billingCycle,
      next_billing_date: data.nextBillingDate.toISOString().split('T')[0], // format as YYYY-MM-DD
      category: data.category,
      logo: '', // or let user upload/select a logo
    };
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/api/subscriptions/${subscriptionToEdit.id}/`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Subscription updated successfully!");
      } else {
        await axios.post('http://localhost:8000/api/subscriptions/', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Subscription added successfully!");
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-darkBlue-700 border-purple-900/20 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Edit Subscription" : "Add New Subscription"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isEditing 
              ? "Update your subscription details below." 
              : "Fill out the information below to add a new subscription."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Subscription Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Netflix, Canva, etc." 
                      {...field} 
                      className="bg-darkBlue-800 border-purple-900/30 focus-visible:ring-purple-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        $
                      </span>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="13.99" 
                        className="bg-darkBlue-800 border-purple-900/30 pl-6 focus-visible:ring-purple-400" 
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="billingCycle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Billing Cycle</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="monthly" className="border-purple-500 text-purple-500" />
                        </FormControl>
                        <FormLabel className="font-normal text-gray-300">Monthly</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yearly" className="border-purple-500 text-purple-500" />
                        </FormControl>
                        <FormLabel className="font-normal text-gray-300">Yearly</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nextBillingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-200">Next Billing Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-darkBlue-800 border-purple-900/30",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-darkBlue-800 border-purple-900/30" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-darkBlue-800 border-purple-900/30 focus-visible:ring-purple-400">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-darkBlue-800 border-purple-900/20">
                      <SelectGroup>
                        <SelectLabel className="text-gray-400">Categories</SelectLabel>
                        {CATEGORIES.map(category => (
                          <SelectItem key={category} value={category} className="text-gray-200 focus:bg-purple-900/20">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-400">
                    Optional: Categorize your subscription for better organization.
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Family plan, work expense, etc."
                      className="resize-none bg-darkBlue-800 border-purple-900/30 focus-visible:ring-purple-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <DialogFooter className="gap-2 sm:gap-0">
              {isEditing && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onClose}
                  className="w-full sm:w-auto"
                >
                  Delete
                </Button>
              )}
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 sm:flex-none bg-darkBlue-800 border-purple-900/30 hover:bg-darkBlue-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 sm:flex-none bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                >
                  {isEditing ? "Update" : "Add"} Subscription
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSubscriptionModal;
