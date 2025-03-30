import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"
import { ArrowDownRight, ArrowUpRight, BookOpen, Download, GraduationCap, TrendingUp, Users } from "lucide-react"
import { useState } from "react"

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: "Statistika",
		href: "/statistics",
	},
]

// Statistika uchun ma'lumotlar
const monthlyStudentsData = [
	{ month: "Yanvar", count: 210 },
	{ month: "Fevral", count: 215 },
	{ month: "Mart", count: 220 },
	{ month: "Aprel", count: 225 },
	{ month: "May", count: 230 },
	{ month: "Iyun", count: 235 },
	{ month: "Iyul", count: 225 },
	{ month: "Avgust", count: 230 },
	{ month: "Sentabr", count: 235 },
	{ month: "Oktabr", count: 240 },
	{ month: "Noyabr", count: 245 },
	{ month: "Dekabr", count: 245 },
]

const monthlyIncomeData = [
	{ month: "Yanvar", amount: 10500000 },
	{ month: "Fevral", amount: 10800000 },
	{ month: "Mart", amount: 11000000 },
	{ month: "Aprel", amount: 11200000 },
	{ month: "May", amount: 11500000 },
	{ month: "Iyun", amount: 11800000 },
	{ month: "Iyul", amount: 11000000 },
	{ month: "Avgust", amount: 11500000 },
	{ month: "Sentabr", amount: 11800000 },
	{ month: "Oktabr", amount: 12000000 },
	{ month: "Noyabr", amount: 12450000 },
	{ month: "Dekabr", amount: 12450000 },
]

const courseDistributionData = [
	{ course: "Ingliz tili", students: 78 },
	{ course: "Matematika", students: 65 },
	{ course: "Rus tili", students: 52 },
	{ course: "Kompyuter savodxonligi", students: 45 },
	{ course: "Fizika", students: 32 },
	{ course: "Kimyo", students: 28 },
	{ course: "Biologiya", students: 24 },
	{ course: "Tarix", students: 22 },
]

const attendanceData = [
	{ month: "Yanvar", rate: 92 },
	{ month: "Fevral", rate: 94 },
	{ month: "Mart", rate: 93 },
	{ month: "Aprel", rate: 95 },
	{ month: "May", rate: 96 },
	{ month: "Iyun", rate: 94 },
	{ month: "Iyul", rate: 92 },
	{ month: "Avgust", rate: 93 },
	{ month: "Sentabr", rate: 95 },
	{ month: "Oktabr", rate: 96 },
	{ month: "Noyabr", rate: 97 },
	{ month: "Dekabr", rate: 97 },
]

const teacherPerformanceData = [
	{ teacher: "Kamola Saidova", rating: 4.8, students: 78 },
	{ teacher: "Akmal Rahimov", rating: 4.7, students: 65 },
	{ teacher: "Olga Petrova", rating: 4.9, students: 52 },
	{ teacher: "Bobur Karimov", rating: 4.6, students: 45 },
	{ teacher: "Jahongir Azimov", rating: 4.7, students: 32 },
	{ teacher: "Nilufar Qodirova", rating: 4.8, students: 28 },
]

// Types for chart data
interface ChartDataItem {
	[key: string]: string | number
}

interface ChartComponentProps {
	data: ChartDataItem[]
	xKey: string
	yKey: string
	height?: number
	color?: string
}

interface PieChartProps {
	data: ChartDataItem[]
	nameKey: string
	valueKey: string
	height?: number
}

// Grafik komponentlari
const BarChartComponent = ({ data, xKey, yKey, height = 300, color = "#3b82f6" }: ChartComponentProps) => {
	const maxValue = Math.max(...data.map((item) => Number(item[yKey]))) * 1.1
	const barWidth = 100 / data.length

	return (
		<div style={{ height: `${height}px` }} className="w-full">
			<svg width="100%" height="100%" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
				<g>
					{data.map((item, index) => {
						const barHeight = (Number(item[yKey]) / maxValue) * height
						const x = index * barWidth
						const y = height - barHeight

						return (
							<g key={index}>
								<rect
									x={x + barWidth * 0.1}
									y={y}
									width={barWidth * 0.8}
									height={barHeight}
									fill={color}
									opacity={0.8}
									rx={4}
									className="transition-all duration-300 hover:opacity-100"
								/>
								<text
									x={x + barWidth / 2}
									y={height - 10}
									textAnchor="middle"
									fontSize="8"
									fill="currentColor"
									className="text-muted-foreground"
								>
									{String(item[xKey]).substring(0, 3)}
								</text>
							</g>
						)
					})}
				</g>
			</svg>
		</div>
	)
}

const LineChartComponent = ({ data, xKey, yKey, height = 300, color = "#3b82f6" }: ChartComponentProps) => {
	const maxValue = Math.max(...data.map((item) => Number(item[yKey]))) * 1.1
	const points = data
		.map((item, index) => {
			const x = (index / (data.length - 1)) * 100
			const y = height - (Number(item[yKey]) / maxValue) * height
			return `${x},${y}`
		})
		.join(" ")

	return (
		<div style={{ height: `${height}px` }} className="w-full">
			<svg width="100%" height="100%" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
				<polyline points={points} fill="none" stroke={color} strokeWidth="2" className="transition-all duration-500" />
				{data.map((item, index) => {
					const x = (index / (data.length - 1)) * 100
					const y = height - (Number(item[yKey]) / maxValue) * height

					return (
						<g key={index}>
							<circle cx={x} cy={y} r="2" fill={color} className="transition-all duration-300 hover:r-3" />
							<text
								x={x}
								y={height - 10}
								textAnchor="middle"
								fontSize="8"
								fill="currentColor"
								className="text-muted-foreground"
							>
								{String(item[xKey]).substring(0, 3)}
							</text>
						</g>
					)
				})}
			</svg>
		</div>
	)
}

const PieChartComponent = ({ data, nameKey, valueKey, height = 300 }: PieChartProps) => {
	const total = data.reduce((sum, item) => sum + Number(item[valueKey]), 0)
	let currentAngle = 0

	const colors = [
		"#3b82f6",
		"#8b5cf6",
		"#ec4899",
		"#f43f5e",
		"#f97316",
		"#eab308",
		"#84cc16",
		"#10b981",
		"#06b6d4",
		"#0ea5e9",
	]

	const centerX = 50
	const centerY = 50
	const radius = 40

	return (
		<div style={{ height: `${height}px` }} className="w-full">
			<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
				{data.map((item, index) => {
					const percentage = Number(item[valueKey]) / total
					const angle = percentage * 360
					const startAngle = currentAngle
					const endAngle = currentAngle + angle
					currentAngle = endAngle

					// SVG arc path
					const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180)
					const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180)
					const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180)
					const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180)

					const largeArcFlag = angle > 180 ? 1 : 0

					const pathData = [
						`M ${centerX} ${centerY}`,
						`L ${startX} ${startY}`,
						`A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
						"Z",
					].join(" ")

					return (
						<path
							key={index}
							d={pathData}
							fill={colors[index % colors.length]}
							stroke="white"
							strokeWidth="0.5"
							className="transition-all duration-300 hover:opacity-80"
						/>
					)
				})}
			</svg>

			<div className="grid grid-cols-2 gap-2 mt-4">
				{data.map((item, index) => (
					<div key={index} className="flex items-center gap-2">
						<div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
						<span className="text-xs truncate">{item[nameKey]}</span>
					</div>
				))}
			</div>
		</div>
	)
}

// Asosiy komponent
export default function Statistics() {
	const [timeRange, setTimeRange] = useState("yil")

	// So'm formatini yaratish
	const formatCurrency = (amount: number): string => {
		return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm"
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Statistika" />
			<main className="flex-1 space-y-6 p-6 md:p-8 animate-in">
				{/* Vaqt oralig'ini tanlash */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<h2 className="text-2xl font-bold">Statistika ma'lumotlari</h2>
					<div className="flex items-center gap-2">
						<Select defaultValue={timeRange} onValueChange={setTimeRange}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Vaqt oralig'i" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="oy">Oylik</SelectItem>
								<SelectItem value="chorak">Choraklik</SelectItem>
								<SelectItem value="yil">Yillik</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" size="icon">
							<Download className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Asosiy statistika kartalari */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<Card className="stats-card card-hover">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Jami o'quvchilar</CardTitle>
							<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
								<Users className="h-4 w-4 text-primary" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">245</div>
							<p className="text-xs text-muted-foreground mt-1">
								<span className="text-emerald-500 flex items-center">
									<ArrowUpRight className="mr-1 h-4 w-4" /> +12% o'tgan oyga nisbatan
								</span>
							</p>
						</CardContent>
					</Card>
					<Card className="stats-card card-hover">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Jami o'qituvchilar</CardTitle>
							<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
								<GraduationCap className="h-4 w-4 text-primary" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">18</div>
							<p className="text-xs text-muted-foreground mt-1">
								<span className="text-emerald-500 flex items-center">
									<ArrowUpRight className="mr-1 h-4 w-4" /> +2 o'tgan oyga nisbatan
								</span>
							</p>
						</CardContent>
					</Card>
					<Card className="stats-card card-hover">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Faol kurslar</CardTitle>
							<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
								<BookOpen className="h-4 w-4 text-primary" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">12</div>
							<p className="text-xs text-muted-foreground mt-1">
								<span className="text-emerald-500 flex items-center">
									<ArrowUpRight className="mr-1 h-4 w-4" /> +3 o'tgan oyga nisbatan
								</span>
							</p>
						</CardContent>
					</Card>
					<Card className="stats-card card-hover">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Oylik daromad</CardTitle>
							<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
								<TrendingUp className="h-4 w-4 text-primary" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">12,450,000 so'm</div>
							<p className="text-xs text-muted-foreground mt-1">
								<span className="text-rose-500 flex items-center">
									<ArrowDownRight className="mr-1 h-4 w-4" /> -3% o'tgan oyga nisbatan
								</span>
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Grafiklar */}
				<Tabs defaultValue="oquvchilar" className="space-y-6">
					<TabsList className="bg-muted/50 p-1">
						<TabsTrigger value="oquvchilar" className="rounded-md">
							O'quvchilar
						</TabsTrigger>
						<TabsTrigger value="daromad" className="rounded-md">
							Daromad
						</TabsTrigger>
						<TabsTrigger value="davomad" className="rounded-md">
							Davomad
						</TabsTrigger>
						<TabsTrigger value="oqituvchilar" className="rounded-md">
							O'qituvchilar
						</TabsTrigger>
					</TabsList>

					<TabsContent value="oquvchilar" className="space-y-6 animate-in">
						<div className="grid gap-6 md:grid-cols-2">
							<Card className="border-none shadow-md">
								<CardHeader>
									<CardTitle>O'quvchilar soni dinamikasi</CardTitle>
									<CardDescription>So'nggi 12 oy uchun o'quvchilar soni o'zgarishi</CardDescription>
								</CardHeader>
								<CardContent>
									<LineChartComponent
										data={monthlyStudentsData}
										xKey="month"
										yKey="count"
										height={250}
										color="#3b82f6"
									/>
								</CardContent>
							</Card>

							<Card className="border-none shadow-md">
								<CardHeader>
									<CardTitle>Kurslar bo'yicha taqsimot</CardTitle>
									<CardDescription>O'quvchilarning kurslar bo'yicha taqsimlanishi</CardDescription>
								</CardHeader>
								<CardContent>
									<PieChartComponent data={courseDistributionData} nameKey="course" valueKey="students" height={250} />
								</CardContent>
							</Card>
						</div>

						<Card className="border-none shadow-md">
							<CardHeader>
								<CardTitle>Yangi o'quvchilar</CardTitle>
								<CardDescription>Har oyda qo'shilgan yangi o'quvchilar soni</CardDescription>
							</CardHeader>
							<CardContent>
								<BarChartComponent
									data={[
										{ month: "Yanvar", count: 15 },
										{ month: "Fevral", count: 12 },
										{ month: "Mart", count: 18 },
										{ month: "Aprel", count: 14 },
										{ month: "May", count: 16 },
										{ month: "Iyun", count: 10 },
										{ month: "Iyul", count: 8 },
										{ month: "Avgust", count: 20 },
										{ month: "Sentabr", count: 25 },
										{ month: "Oktabr", count: 15 },
										{ month: "Noyabr", count: 12 },
										{ month: "Dekabr", count: 10 },
									]}
									xKey="month"
									yKey="count"
									height={250}
									color="#10b981"
								/>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="daromad" className="space-y-6 animate-in">
						<Card className="border-none shadow-md">
							<CardHeader>
								<CardTitle>Oylik daromad dinamikasi</CardTitle>
								<CardDescription>So'nggi 12 oy uchun daromad o'zgarishi</CardDescription>
							</CardHeader>
							<CardContent>
								<BarChartComponent data={monthlyIncomeData} xKey="month" yKey="amount" height={300} color="#f43f5e" />

								<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
									<Card>
										<CardHeader className="p-4">
											<CardTitle className="text-sm">O'rtacha oylik daromad</CardTitle>
										</CardHeader>
										<CardContent className="p-4 pt-0">
											<div className="text-2xl font-bold">
												{formatCurrency(
													monthlyIncomeData.reduce((sum, item) => sum + item.amount, 0) / monthlyIncomeData.length,
												)}
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardHeader className="p-4">
											<CardTitle className="text-sm">Eng yuqori daromad</CardTitle>
										</CardHeader>
										<CardContent className="p-4 pt-0">
											<div className="text-2xl font-bold">
												{formatCurrency(Math.max(...monthlyIncomeData.map((item) => item.amount)))}
											</div>
											<p className="text-xs text-muted-foreground">Noyabr, Dekabr</p>
										</CardContent>
									</Card>

									<Card>
										<CardHeader className="p-4">
											<CardTitle className="text-sm">Yillik jami daromad</CardTitle>
										</CardHeader>
										<CardContent className="p-4 pt-0">
											<div className="text-2xl font-bold">
												{formatCurrency(monthlyIncomeData.reduce((sum, item) => sum + item.amount, 0))}
											</div>
										</CardContent>
									</Card>
								</div>
							</CardContent>
						</Card>

						<div className="grid gap-6 md:grid-cols-2">
							<Card className="border-none shadow-md">
								<CardHeader>
									<CardTitle>Kurslar bo'yicha daromad</CardTitle>
									<CardDescription>Har bir kursdan olingan daromad</CardDescription>
								</CardHeader>
								<CardContent>
									<BarChartComponent
										data={[
											{ course: "Ingliz tili", amount: 35100000 },
											{ course: "Matematika", amount: 26000000 },
											{ course: "Rus tili", amount: 23400000 },
											{ course: "Kompyuter", amount: 22500000 },
											{ course: "Fizika", amount: 12800000 },
											{ course: "Kimyo", amount: 11200000 },
										]}
										xKey="course"
										yKey="amount"
										height={250}
										color="#8b5cf6"
									/>
								</CardContent>
							</Card>

							<Card className="border-none shadow-md">
								<CardHeader>
									<CardTitle>To'lov usullari</CardTitle>
									<CardDescription>To'lovlarning usullari bo'yicha taqsimlanishi</CardDescription>
								</CardHeader>
								<CardContent>
									<PieChartComponent
										data={[
											{ method: "Naqd", amount: 65450000 },
											{ method: "Karta", amount: 52300000 },
											{ method: "Bank o'tkazmasi", amount: 12500000 },
											{ method: "Boshqa", amount: 5750000 },
										]}
										nameKey="method"
										valueKey="amount"
										height={250}
									/>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="davomad" className="space-y-6 animate-in">
						<Card className="border-none shadow-md">
							<CardHeader>
								<CardTitle>Davomad ko'rsatkichi</CardTitle>
								<CardDescription>O'quvchilarning darslarga qatnashish foizi</CardDescription>
							</CardHeader>
							<CardContent>
								<LineChartComponent data={attendanceData} xKey="month" yKey="rate" height={300} color="#10b981" />

								<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
									<Card>
										<CardHeader className="p-4">
											<CardTitle className="text-sm">O'rtacha davomad</CardTitle>
										</CardHeader>
										<CardContent className="p-4 pt-0">
											<div className="text-2xl font-bold">
												{(attendanceData.reduce((sum, item) => sum + item.rate, 0) / attendanceData.length).toFixed(1)}%
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardHeader className="p-4">
											<CardTitle className="text-sm">Eng yuqori davomad</CardTitle>
										</CardHeader>
										<CardContent className="p-4 pt-0">
											<div className="text-2xl font-bold">{Math.max(...attendanceData.map((item) => item.rate))}%</div>
											<p className="text-xs text-muted-foreground">Noyabr, Dekabr</p>
										</CardContent>
									</Card>

									<Card>
										<CardHeader className="p-4">
											<CardTitle className="text-sm">Eng past davomad</CardTitle>
										</CardHeader>
										<CardContent className="p-4 pt-0">
											<div className="text-2xl font-bold">{Math.min(...attendanceData.map((item) => item.rate))}%</div>
											<p className="text-xs text-muted-foreground">Yanvar, Iyul</p>
										</CardContent>
									</Card>
								</div>
							</CardContent>
						</Card>

						<div className="grid gap-6 md:grid-cols-2">
							<Card className="border-none shadow-md">
								<CardHeader>
									<CardTitle>Kurslar bo'yicha davomad</CardTitle>
									<CardDescription>Har bir kursdagi davomad ko'rsatkichi</CardDescription>
								</CardHeader>
								<CardContent>
									<BarChartComponent
										data={[
											{ course: "Ingliz tili", rate: 95 },
											{ course: "Matematika", rate: 92 },
											{ course: "Rus tili", rate: 94 },
											{ course: "Kompyuter", rate: 96 },
											{ course: "Fizika", rate: 90 },
											{ course: "Kimyo", rate: 93 },
										]}
										xKey="course"
										yKey="rate"
										height={250}
										color="#0ea5e9"
									/>
								</CardContent>
							</Card>

							<Card className="border-none shadow-md">
								<CardHeader>
									<CardTitle>Hafta kunlari bo'yicha davomad</CardTitle>
									<CardDescription>Hafta kunlari bo'yicha davomad ko'rsatkichi</CardDescription>
								</CardHeader>
								<CardContent>
									<BarChartComponent
										data={[
											{ day: "Dushanba", rate: 96 },
											{ day: "Seshanba", rate: 95 },
											{ day: "Chorshanba", rate: 94 },
											{ day: "Payshanba", rate: 93 },
											{ day: "Juma", rate: 92 },
											{ day: "Shanba", rate: 90 },
										]}
										xKey="day"
										yKey="rate"
										height={250}
										color="#f97316"
									/>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="oqituvchilar" className="space-y-6 animate-in">
						<div className="grid gap-6 md:grid-cols-2">
							<Card className="border-none shadow-md">
								<CardHeader>
									<CardTitle>O'qituvchilar reytingi</CardTitle>
									<CardDescription>O'quvchilar baholari asosida o'qituvchilar reytingi</CardDescription>
								</CardHeader>
								<CardContent>
									<BarChartComponent
										data={teacherPerformanceData}
										xKey="teacher"
										yKey="rating"
										height={250}
										color="#8b5cf6"
									/>
								</CardContent>
							</Card>

							<Card className="border-none shadow-md">
								<CardHeader>
									<CardTitle>O'qituvchilar yuklamasi</CardTitle>
									<CardDescription>Har bir o'qituvchiga to'g'ri keladigan o'quvchilar soni</CardDescription>
								</CardHeader>
								<CardContent>
									<BarChartComponent
										data={teacherPerformanceData}
										xKey="teacher"
										yKey="students"
										height={250}
										color="#ec4899"
									/>
								</CardContent>
							</Card>
						</div>

						<Card className="border-none shadow-md">
							<CardHeader>
								<CardTitle>O'qituvchilar samaradorligi</CardTitle>
								<CardDescription>O'qituvchilar samaradorligi bo'yicha batafsil ma'lumotlar</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b">
												<th className="text-left p-2">O'qituvchi</th>
												<th className="text-left p-2">Fan</th>
												<th className="text-left p-2">O'quvchilar</th>
												<th className="text-left p-2">Reyting</th>
												<th className="text-left p-2">Davomad</th>
												<th className="text-left p-2">Samaradorlik</th>
											</tr>
										</thead>
										<tbody>
											<tr className="border-b hover:bg-muted/50">
												<td className="p-2 font-medium">Kamola Saidova</td>
												<td className="p-2">Ingliz tili</td>
												<td className="p-2">78</td>
												<td className="p-2">4.8</td>
												<td className="p-2">95%</td>
												<td className="p-2">
													<div className="w-full bg-muted rounded-full h-2">
														<div className="bg-green-500 h-2 rounded-full" style={{ width: "96%" }}></div>
													</div>
												</td>
											</tr>
											<tr className="border-b hover:bg-muted/50">
												<td className="p-2 font-medium">Akmal Rahimov</td>
												<td className="p-2">Matematika</td>
												<td className="p-2">65</td>
												<td className="p-2">4.7</td>
												<td className="p-2">92%</td>
												<td className="p-2">
													<div className="w-full bg-muted rounded-full h-2">
														<div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
													</div>
												</td>
											</tr>
											<tr className="border-b hover:bg-muted/50">
												<td className="p-2 font-medium">Olga Petrova</td>
												<td className="p-2">Rus tili</td>
												<td className="p-2">52</td>
												<td className="p-2">4.9</td>
												<td className="p-2">94%</td>
												<td className="p-2">
													<div className="w-full bg-muted rounded-full h-2">
														<div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }}></div>
													</div>
												</td>
											</tr>
											<tr className="border-b hover:bg-muted/50">
												<td className="p-2 font-medium">Bobur Karimov</td>
												<td className="p-2">Kompyuter savodxonligi</td>
												<td className="p-2">45</td>
												<td className="p-2">4.6</td>
												<td className="p-2">96%</td>
												<td className="p-2">
													<div className="w-full bg-muted rounded-full h-2">
														<div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
													</div>
												</td>
											</tr>
											<tr className="border-b hover:bg-muted/50">
												<td className="p-2 font-medium">Jahongir Azimov</td>
												<td className="p-2">Fizika</td>
												<td className="p-2">32</td>
												<td className="p-2">4.7</td>
												<td className="p-2">90%</td>
												<td className="p-2">
													<div className="w-full bg-muted rounded-full h-2">
														<div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
													</div>
												</td>
											</tr>
											<tr className="hover:bg-muted/50">
												<td className="p-2 font-medium">Nilufar Qodirova</td>
												<td className="p-2">Kimyo</td>
												<td className="p-2">28</td>
												<td className="p-2">4.8</td>
												<td className="p-2">93%</td>
												<td className="p-2">
													<div className="w-full bg-muted rounded-full h-2">
														<div className="bg-green-500 h-2 rounded-full" style={{ width: "96%" }}></div>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>

				{/* Qo'shimcha statistika */}
				<div className="grid gap-6 md:grid-cols-3">
					<Card className="border-none shadow-md md:col-span-2">
						<CardHeader>
							<CardTitle>Yillik o'sish ko'rsatkichlari</CardTitle>
							<CardDescription>Asosiy ko'rsatkichlarning yillik o'sishi</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<div className="flex items-center justify-between mb-1">
										<span className="text-sm font-medium">O'quvchilar soni</span>
										<span className="text-sm font-medium text-emerald-500">+15%</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between mb-1">
										<span className="text-sm font-medium">Daromad</span>
										<span className="text-sm font-medium text-emerald-500">+18%</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div className="bg-red-500 h-2 rounded-full" style={{ width: "82%" }}></div>
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between mb-1">
										<span className="text-sm font-medium">Kurslar soni</span>
										<span className="text-sm font-medium text-emerald-500">+25%</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between mb-1">
										<span className="text-sm font-medium">O'qituvchilar soni</span>
										<span className="text-sm font-medium text-emerald-500">+12%</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div className="bg-purple-500 h-2 rounded-full" style={{ width: "60%" }}></div>
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between mb-1">
										<span className="text-sm font-medium">O'rtacha reyting</span>
										<span className="text-sm font-medium text-emerald-500">+5%</span>
									</div>
									<div className="w-full bg-muted rounded-full h-2">
										<div className="bg-orange-500 h-2 rounded-full" style={{ width: "90%" }}></div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-none shadow-md">
						<CardHeader>
							<CardTitle>Yaqinlashayotgan to'lovlar</CardTitle>
							<CardDescription>Keyingi 7 kun ichida kutilayotgan to'lovlar</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{[
									{ name: "Aziza Karimova", course: "Ingliz tili", amount: "450,000", dueDate: "Bugun", urgent: true },
									{ name: "Jasur Toshmatov", course: "Matematika", amount: "400,000", dueDate: "Ertaga", urgent: true },
									{
										name: "Malika Rahimova",
										course: "Rus tili",
										amount: "450,000",
										dueDate: "3 kun ichida",
										urgent: false,
									},
									{
										name: "Sardor Aliyev",
										course: "Fizika",
										amount: "500,000",
										dueDate: "5 kun ichida",
										urgent: false,
									},
								].map((payment, index) => (
									<div
										key={index}
										className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
									>
										<div>
											<p className="font-medium">{payment.name}</p>
											<p className="text-sm text-muted-foreground">{payment.course}</p>
										</div>
										<div className="text-right">
											<p className="font-medium">{payment.amount} so'm</p>
											<p className={`text-sm ${payment.urgent ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
												{payment.dueDate}
											</p>
										</div>
									</div>
								))}

								<div className="pt-2">
									<Button variant="outline" className="w-full">
										Barcha to'lovlarni ko'rish
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</AppLayout>
	)
}
