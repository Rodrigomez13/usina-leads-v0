import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, TrendingUp, TrendingDown, Zap } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Zap className="h-4 w-4 text-[#148f77]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3,770</div>
          <p className="text-xs text-muted-foreground">+12.5% respecto a ayer</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversiones</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-[#148f77]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">950</div>
          <p className="text-xs text-muted-foreground">Tasa de conversión: 25.2%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
          <TrendingUp className="h-4 w-4 text-[#148f77]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$5,551.50</div>
          <p className="text-xs text-muted-foreground">+5.2% respecto a ayer</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Costo por Conversión</CardTitle>
          <TrendingDown className="h-4 w-4 text-[#148f77]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$5.84</div>
          <p className="text-xs text-muted-foreground">-2.1% respecto a ayer</p>
        </CardContent>
      </Card>
    </div>
  )
}
