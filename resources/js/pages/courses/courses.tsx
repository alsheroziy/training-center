import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Head, Link } from "@inertiajs/react"
import {
	AlertCircle,
	BookOpen,
	Clock,
	DollarSign,
	Download,
	Edit,
	Eye,
	Filter,
	GraduationCap,
	Loader2,
	MoreHorizontal,
	Plus,
	Search,
	SlidersHorizontal,
	Trash2,
	Users
} from "lucide-react"
import { useEffect, useState } from "react"

interface Course {
	id: number
	name: string
	teacher: string
	duration: string
	price: string
	students: number
	status: string
	color: string
	description: string
	category: string
	level: string
	maxStudents: number
}

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: "Kurslar",
		href: "/courses",
	},
]

export default function CoursesPage() {
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(true)
	const [courses, setCourses] = useState<Course[]>([])
	const [searchQuery, setSearchQuery] = useState("")
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [courseToDelete, setCourseToDelete] = useState<number | null>(null)

	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedCourses = localStorage.getItem("courses")
			if (savedCourses) {
				setCourses(JSON.parse(savedCourses))
			}
			setIsLoading(false)
		}
	}, [])

	const handleDeleteClick = (courseId: number) => {
		setCourseToDelete(courseId)
		setDeleteDialogOpen(true)
	}

	const handleDeleteCourseConfirm = () => {
		if (courseToDelete) {
			const courseToDeleteObj = courses.find((course) => course.id === courseToDelete)
			const updatedCourses = courses.filter((course) => course.id !== courseToDelete)
			setCourses(updatedCourses)
			localStorage.setItem("courses", JSON.stringify(updatedCourses))

			toast({
				title: "Kurs o'chirildi",
				description: `"${courseToDeleteObj?.name}" kursi muvaffaqiyatli o'chirildi.`,
				variant: "destructive",
			})

			setDeleteDialogOpen(false)
			setCourseToDelete(null)
		}
	}

	const filteredCourses = courses.filter((course) =>
		course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		course.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
		course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
		course.level.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const getColorClass = (color: string) => {
		switch (color) {
			case "blue":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
			case "purple":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
			case "red":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
			case "green":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
			case "orange":
				return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
			case "teal":
				return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
			case "emerald":
				return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
			case "amber":
				return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
		}
	}

	const getIconBgClass = (color: string) => {
		const colorMap: Record<string, string> = {
			blue: "bg-blue-500",
			purple: "bg-purple-500",
			red: "bg-red-500",
			green: "bg-green-500",
			orange: "bg-orange-500",
			teal: "bg-teal-500",
			emerald: "bg-emerald-500",
			amber: "bg-amber-500",
		}
		return colorMap[color] || "bg-gray-500"
	}

	if (isLoading) {
		return (
			<AppLayout breadcrumbs={breadcrumbs}>
				<Head title="Kurslar" />
				<main className="flex-1 p-6 md:p-8 flex items-center justify-center">
					<div className="flex flex-col items-center gap-2">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
						<p>Ma'lumotlar yuklanmoqda...</p>
					</div>
				</main>
			</AppLayout>
		)
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Kurslar" />
			<main className="flex-1 space-y-6 p-6 md:p-8 animate-in">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
						<div className="relative w-full sm:w-auto">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Kurs qidirish..."
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
						<Link href="/courses/new">
							<Button size="sm" className="gap-1">
								<Plus className="h-4 w-4" />
								Yangi kurs
							</Button>
						</Link>
					</div>
				</div>

				<Tabs defaultValue="cards" className="space-y-6">
					<TabsList className="bg-muted/50 p-1">
						<TabsTrigger value="cards" className="rounded-md">
							Kartochkalar
						</TabsTrigger>
						<TabsTrigger value="list" className="rounded-md">
							Ro'yxat
						</TabsTrigger>
					</TabsList>

					<TabsContent value="cards" className="space-y-0 animate-in">
						{filteredCourses.length === 0 ? (
							<div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
								<AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
								<h3 className="text-lg font-medium">Kurslar topilmadi</h3>
								<p className="text-muted-foreground mt-2 mb-4">Qidiruv so'roviga mos kurslar mavjud emas.</p>
								<Button variant="outline" onClick={() => setSearchQuery("")}>
									Barcha kurslarni ko'rsatish
								</Button>
							</div>
						) : (
							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
								{filteredCourses.map((course) => (
									<Card
										key={course.id}
										className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
									>
										<CardHeader className={`p-4 ${getColorClass(course.color)} bg-opacity-30 dark:bg-opacity-30`}>
											<div className="flex justify-between items-start">
												<div className="flex items-center gap-3">
													<div
														className={`flex h-10 w-10 items-center justify-center rounded-full ${getIconBgClass(course.color)} text-white`}
													>
														<BookOpen className="h-5 w-5" />
													</div>
													<CardTitle className="text-lg">{course.name}</CardTitle>
												</div>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem asChild>
															<Link href={`/courses/${course.id}`}>
																<Eye className="mr-2 h-4 w-4" />
																Ko'rish
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem asChild>
															<Link href={`/courses/${course.id}/edit`}>
																<Edit className="mr-2 h-4 w-4" />
																Tahrirlash
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem
															className="text-destructive focus:text-destructive"
															onClick={() => handleDeleteClick(course.id)}
														>
															<Trash2 className="mr-2 h-4 w-4" />
															O'chirish
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</CardHeader>
										<CardContent className="p-4">
											<p className="text-sm text-muted-foreground mb-4">{course.description}</p>
											<div className="space-y-3">
												<div className="flex items-center gap-2">
													<GraduationCap className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">{course.teacher}</span>
												</div>
												<div className="flex items-center gap-2">
													<Clock className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">{course.duration}</span>
												</div>
												<div className="flex items-center gap-2">
													<DollarSign className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">{course.price}</span>
												</div>
												<div className="flex items-center gap-2">
													<Users className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">{course.students} / {course.maxStudents} o'quvchi</span>
												</div>
											</div>
										</CardContent>
										<CardFooter className="flex justify-between items-center p-4 pt-0">
											<Badge
												variant="outline"
												className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-0"
											>
												{course.status}
											</Badge>
											<Button variant="outline" size="sm" asChild>
												<Link href={`/courses/${course.id}`}>
													Batafsil
												</Link>
											</Button>
										</CardFooter>
									</Card>
								))}
							</div>
						)}
					</TabsContent>

					<TabsContent value="list" className="space-y-0 animate-in">
						<Card className="border-none shadow-md">
							<CardHeader className="px-6 py-4">
								<CardTitle>Kurslar ro'yxati</CardTitle>
							</CardHeader>
							<CardContent className="p-0">
								{filteredCourses.length === 0 ? (
									<div className="flex flex-col items-center justify-center p-8 text-center">
										<AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
										<h3 className="text-lg font-medium">Kurslar topilmadi</h3>
										<p className="text-muted-foreground mt-2 mb-4">Qidiruv so'roviga mos kurslar mavjud emas.</p>
										<Button variant="outline" onClick={() => setSearchQuery("")}>
											Barcha kurslarni ko'rsatish
										</Button>
									</div>
								) : (
									<div className="rounded-md border">
										<table className="w-full">
											<thead>
												<tr className="bg-muted/50 hover:bg-muted/50 border-b">
													<th className="h-10 px-4 text-left align-middle font-medium">Kurs nomi</th>
													<th className="h-10 px-4 text-left align-middle font-medium">O'qituvchi</th>
													<th className="h-10 px-4 text-left align-middle font-medium">Davomiyligi</th>
													<th className="h-10 px-4 text-left align-middle font-medium">Narxi</th>
													<th className="h-10 px-4 text-left align-middle font-medium">O'quvchilar</th>
													<th className="h-10 px-4 text-left align-middle font-medium">Status</th>
													<th className="h-10 px-4 text-right align-middle font-medium">Amallar</th>
												</tr>
											</thead>
											<tbody>
												{filteredCourses.map((course) => (
													<tr key={course.id} className="border-b hover:bg-muted/50 transition-colors">
														<td className="p-4 align-middle font-medium">{course.name}</td>
														<td className="p-4 align-middle">{course.teacher}</td>
														<td className="p-4 align-middle">{course.duration}</td>
														<td className="p-4 align-middle">{course.price}</td>
														<td className="p-4 align-middle">
															<div className="flex items-center gap-1">
																<Users className="h-4 w-4 text-muted-foreground" />
																<span>{course.students} / {course.maxStudents}</span>
															</div>
														</td>
														<td className="p-4 align-middle">
															<Badge
																variant="outline"
																className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-0"
															>
																{course.status}
															</Badge>
														</td>
														<td className="p-4 align-middle text-right">
															<div className="flex justify-end gap-1">
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-8 w-8"
																	asChild
																>
																	<Link href={`/courses/${course.id}`}>
																		<Eye className="h-4 w-4" />
																	</Link>
																</Button>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-8 w-8"
																	asChild
																>
																	<Link href={`/courses/${course.id}/edit`}>
																		<Edit className="h-4 w-4" />
																	</Link>
																</Button>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-8 w-8 text-destructive hover:text-destructive"
																	onClick={() => handleDeleteClick(course.id)}
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>

			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Kursni o'chirish</AlertDialogTitle>
						<AlertDialogDescription>
							Haqiqatan ham bu kursni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Bekor qilish</AlertDialogCancel>
						<AlertDialogAction onClick={handleDeleteCourseConfirm} className="bg-destructive text-destructive-foreground">
							O'chirish
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</AppLayout>
	)
}
