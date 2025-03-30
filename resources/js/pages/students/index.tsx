import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, router } from '@inertiajs/react'
import debounce from 'lodash/debounce'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

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
    group?: {
        id: number;
        name: string;
    };
}

interface Props {
    students: {
        data: Student[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "O'quvchilar",
        href: "/students",
    },
];

export default function StudentsPage({ students }: Props) {
    const { toast } = useToast();
    const searchParams = new URLSearchParams(window.location.search);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [isDeleting, setIsDeleting] = useState(false);
    const debouncedFnRef = useRef<(((term: string) => void) & { cancel: () => void }) | null>(null);

    const debouncedSearch = useCallback((term: string) => {
        if (debouncedFnRef.current) {
            debouncedFnRef.current.cancel();
        }
        const debouncedFn = debounce((searchTerm: string) => {
            router.get('/students', { search: searchTerm }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);
        debouncedFnRef.current = debouncedFn;
        debouncedFn(term);
    }, [router]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
    };

    useEffect(() => {
        return () => {
            if (debouncedFnRef.current) {
                debouncedFnRef.current.cancel();
            }
        };
    }, []);

    const handleDelete = (student: Student) => {
        setIsDeleting(true);

        router.delete(`/students/${student.id}`, {
            onSuccess: () => {
                toast({
                    title: "O'quvchi o'chirildi",
                    description: `${student.first_name} ${student.last_name} muvaffaqiyatli o'chirildi.`,
                });
            },
            onError: () => {
                toast({
                    title: "Xatolik yuz berdi",
                    description: "O'quvchini o'chirishda xatolik yuz berdi.",
                    variant: "destructive",
                });
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="O'quvchilar" />
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">O'quvchilar</h1>
                    <Link href="/students/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Yangi o'quvchi
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>O'quvchilar ro'yxati</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="O'quvchi qidirish..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>F.I.O</TableHead>
                                        <TableHead>Telefon</TableHead>
                                        <TableHead>Guruh</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Amallar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students.data.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                {student.last_name} {student.first_name} {student.middle_name}
                                            </TableCell>
                                            <TableCell>{student.phone}</TableCell>
                                            <TableCell>{student.group?.name || '-'}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    student.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                                                    student.status === 'inactive' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                                                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
                                                }`}>
                                                    {student.status === 'active' ? 'Faol' :
                                                     student.status === 'inactive' ? 'Faol emas' :
                                                     'Bitirgan'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Link href={`/students/${student.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="destructive" size="sm" disabled={isDeleting}>
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>O'quvchini o'chirish</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Siz rostdan ham {student.first_name} {student.last_name}ni o'chirmoqchimisiz?
                                                                    Bu amalni ortga qaytarib bo'lmaydi.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(student)}
                                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                >
                                                                    O'chirish
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <div>
                                Jami: {students.total} ta o'quvchi
                            </div>
                            <div className="flex space-x-2">
                                {Array.from({ length: students.last_page }, (_, i) => i + 1).map((page) => (
                                    <Link
                                        key={page}
                                        href={`/students?page=${page}`}
                                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 w-8 ${
                                            page === students.current_page
                                                ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
                                                : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                    >
                                        {page}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 