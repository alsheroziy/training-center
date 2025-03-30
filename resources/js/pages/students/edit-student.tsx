import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    first_name: z.string().min(1, 'Ismni kiriting'),
    last_name: z.string().min(1, 'Familiyani kiriting'),
    middle_name: z.string().optional(),
    birth_date: z.string().min(1, 'Tug\'ilgan sanani kiriting'),
    gender: z.enum(['male', 'female'], {
        required_error: 'Jinsni tanlang',
    }),
    phone: z.string().min(1, 'Telefon raqamini kiriting'),
    email: z.string().email('Noto\'g\'ri email format').optional().or(z.literal('')),
    address: z.string().optional(),
    parent_name: z.string().optional(),
    parent_phone: z.string().optional(),
    group_id: z.string().optional(),
    status: z.enum(['active', 'inactive', 'graduated'], {
        required_error: 'Statusni tanlang',
    }),
    notes: z.string().optional(),
});

interface Group {
    id: number;
    name: string;
}

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    birth_date: string;
    gender: 'male' | 'female';
    phone: string;
    email: string | null;
    address: string | null;
    parent_name: string | null;
    parent_phone: string | null;
    group_id: number | null;
    status: 'active' | 'inactive' | 'graduated';
    notes: string | null;
}

interface Props {
    student: Student;
    groups: Group[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "O'quvchilar",
        href: "/students",
    },
    {
        title: "O'quvchini tahrirlash",
        href: `/students/${student?.id}/edit`,
    },
];

export default function EditStudentPage({ student, groups }: Props) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: student.first_name,
            last_name: student.last_name,
            middle_name: student.middle_name || '',
            birth_date: student.birth_date,
            gender: student.gender,
            phone: student.phone,
            email: student.email || '',
            address: student.address || '',
            parent_name: student.parent_name || '',
            parent_phone: student.parent_phone || '',
            group_id: student.group_id?.toString() || '',
            status: student.status,
            notes: student.notes || '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        router.put(`/students/${student.id}`, values, {
            onSuccess: () => {
                toast({
                    title: 'Muvaffaqiyatli',
                    description: 'O\'quvchi ma\'lumotlari muvaffaqiyatli yangilandi',
                });
            },
            onError: () => {
                toast({
                    title: 'Xatolik',
                    description: 'O\'quvchi ma\'lumotlarini yangilashda xatolik yuz berdi',
                    variant: 'destructive',
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="O'quvchini tahrirlash" />
            <div className="container mx-auto py-6">
                <div className="mb-6">
                    <Link href="/students">
                        <Button variant="outline" className="gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            O'quvchilar ro'yxatiga qaytish
                        </Button>
                    </Link>
                </div>

                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>O'quvchi ma'lumotlarini tahrirlash</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ism</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ism" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Familiya</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Familiya" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="middle_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Otasining ismi</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Otasining ismi" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="birth_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tug'ilgan sana</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Jins</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Jinsni tanlang" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="male">Erkak</SelectItem>
                                                        <SelectItem value="female">Ayol</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Telefon</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Telefon raqami" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Manzil</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Manzil" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="parent_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ota-ona ismi</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ota-ona ismi" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="parent_phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ota-ona telefoni</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ota-ona telefoni" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="group_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Guruh</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Guruhni tanlang" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {groups.map((group) => (
                                                            <SelectItem key={group.id} value={group.id.toString()}>
                                                                {group.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Statusni tanlang" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="active">Faol</SelectItem>
                                                        <SelectItem value="inactive">Faol emas</SelectItem>
                                                        <SelectItem value="graduated">Bitirgan</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Qo'shimcha ma'lumotlar</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Qo'shimcha ma'lumotlar" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.visit('/students')}
                                        disabled={isSubmitting}
                                    >
                                        Bekor qilish
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Saqlanmoqda...' : 'Saqlash'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 