import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Head, Link } from "@inertiajs/react"
import { Download, Filter, MoreHorizontal, Plus, Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

interface Payment {
	id: number
	student: string
	course: string
	amount: string
	date: string
	method: string
	status: string
}

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: "To'lovlar",
		href: "/payments",
	},
]

export default function PaymentsPage() {
	const { toast } = useToast()
	const [searchQuery, setSearchQuery] = useState("")
	const [payments, setPayments] = useState<Payment[]>(() => {
		if (typeof window !== "undefined") {
			const savedPayments = localStorage.getItem("payments")
			const initialPayments = savedPayments
				? JSON.parse(savedPayments)
				: [
						{
							id: 1,
							student: "Aziza Karimova",
							course: "Ingliz tili",
							amount: "450,000 so'm",
							date: "15.03.2023",
							method: "Naqd",
							status: "To'langan",
						},
						{
							id: 2,
							student: "Jasur Toshmatov",
							course: "Matematika",
							amount: "400,000 so'm",
							date: "20.03.2023",
							method: "Karta",
							status: "To'langan",
						},
						{
							id: 3,
							student: "Malika Rahimova",
							course: "Rus tili",
							amount: "450,000 so'm",
							date: "25.03.2023",
							method: "Naqd",
							status: "To'langan",
						},
						{
							id: 4,
							student: "Sardor Aliyev",
							course: "Fizika",
							amount: "400,000 so'm",
							date: "01.04.2023",
							method: "Karta",
							status: "To'lanmagan",
						},
						{
							id: 5,
							student: "Nilufar Qodirova",
							course: "Kimyo",
							amount: "400,000 so'm",
							date: "05.04.2023",
							method: "Naqd",
							status: "To'langan",
						},
						{
							id: 6,
							student: "Akmal Salimov",
							course: "Ingliz tili",
							amount: "450,000 so'm",
							date: "10.04.2023",
							method: "Karta",
							status: "To'langan",
						},
						{
							id: 7,
							student: "Dilnoza Karimova",
							course: "Matematika",
							amount: "400,000 so'm",
							date: "15.04.2023",
							method: "Naqd",
							status: "To'lanmagan",
						},
				  ]

			if (!savedPayments) {
				localStorage.setItem("payments", JSON.stringify(initialPayments))
			}

			return initialPayments
		}

		return []
	})

	const handleDeletePayment = (id: number) => {
		const paymentToDelete = payments.find((payment: Payment) => payment.id === id)

		if (paymentToDelete) {
			const updatedPayments = payments.filter((payment: Payment) => payment.id !== id)
			setPayments(updatedPayments)

			localStorage.setItem("payments", JSON.stringify(updatedPayments))

			toast({
				title: "To'lov o'chirildi",
				description: `${paymentToDelete.student} uchun to'lov muvaffaqiyatli o'chirildi.`,
				variant: "destructive",
			})
		}
	}

	const filteredPayments = payments.filter(
		(payment: Payment) =>
			payment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
			payment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
			payment.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
			payment.method.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="To'lovlar" />
			<main className="flex-1 space-y-6 p-6 md:p-8 animate-in">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
						<div className="relative w-full sm:w-auto">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="To'lov qidirish..."
								className="pl-8 w-full sm:w-[250px] md:w-[300px]"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="flex items-center gap-2 mt-2 sm:mt-0">
							<Button variant="outline" size="icon" className="h-9 w-9">
								<Filter className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="icon" className="h-9 w-9">
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" className="gap-1">
							<Download className="h-4 w-4" />
							Export
						</Button>
						<Link href="/payments/new">
							<Button size="sm" className="gap-1">
								<Plus className="h-4 w-4" />
								Yangi to'lov
							</Button>
						</Link>
					</div>
				</div>

				<Card className="border-none shadow-md">
					<CardHeader className="px-6 py-4">
						<CardTitle>To'lovlar ro'yxati</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<div className="rounded-md border">
							<Table>
								<TableHeader>
									<TableRow className="bg-muted/50 hover:bg-muted/50">
										<TableHead className="font-medium">ID</TableHead>
										<TableHead className="font-medium">O'quvchi</TableHead>
										<TableHead className="font-medium">Kurs</TableHead>
										<TableHead className="font-medium">Miqdor</TableHead>
										<TableHead className="font-medium">Sana</TableHead>
										<TableHead className="font-medium">To'lov usuli</TableHead>
										<TableHead className="font-medium">Status</TableHead>
										<TableHead className="text-right font-medium">Amallar</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredPayments.map((payment: Payment) => (
										<TableRow key={payment.id} className="hover:bg-muted/50">
											<TableCell className="font-medium">{payment.id}</TableCell>
											<TableCell className="font-medium">{payment.student}</TableCell>
											<TableCell>{payment.course}</TableCell>
											<TableCell>{payment.amount}</TableCell>
											<TableCell>{payment.date}</TableCell>
											<TableCell>{payment.method}</TableCell>
											<TableCell>
												<span
													className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
														payment.status === "To'langan"
															? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
															: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
													}`}
												>
													{payment.status}
												</span>
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon" className="h-8 w-8">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem>Ko'rish</DropdownMenuItem>
														<DropdownMenuItem>Tahrirlash</DropdownMenuItem>
														<DropdownMenuItem className="text-red-600" onClick={() => handleDeletePayment(payment.id)}>
															O'chirish
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</main>
		</AppLayout>
	)
}
