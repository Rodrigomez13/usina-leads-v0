import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";

interface Stat {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
}

interface DashboardStatsProps {
  stats?: Stat[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  // Use default stats if none are provided
  const displayStats = stats || [
    {
      title: "Total Leads",
      value: "3,770",
      change: "+12.5% respecto a ayer",
      changeType: "increase",
    },
    {
      title: "Conversiones",
      value: "950",
      change: "Tasa de conversión: 25.2%",
      changeType: "increase",
    },
    {
      title: "Gasto Total",
      value: "$5,551.50",
      change: "+5.2% respecto a ayer",
      changeType: "increase",
    },
    {
      title: "Costo por Conversión",
      value: "$5.84",
      change: "-2.1% respecto a ayer",
      changeType: "decrease",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {displayStats.map((stat, index) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {(() => {
              let Icon;
              if (stat.changeType === "increase") {
                Icon = ArrowUpRight;
              } else if (stat.changeType === "decrease") {
                Icon = TrendingDown;
              } else {
                Icon = TrendingUp;
              }
              return <Icon className="h-4 w-4 text-[#148f77]" />;
            })()}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.change && (
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
