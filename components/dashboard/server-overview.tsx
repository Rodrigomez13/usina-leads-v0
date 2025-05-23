import { Card, CardContent } from "@/components/ui/card";

interface ServerOverviewProps {
  serverId?: string;
  coefficient?: number;
  stats?: {
    leads: number;
    conversions: number;
    conversionRate: number;
    expense: number;
    leadCost: number;
    conversionCost: number;
  };
}

export function ServerOverview({
  serverId = "default",
  coefficient = 1.0,
  stats = {
    leads: 3770,
    conversions: 950,
    conversionRate: 25.2,
    expense: 5551.5,
    leadCost: 1.47,
    conversionCost: 5.84,
  },
}: ServerOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 bg-[#022A29]">
      <Card>
        <CardContent className="p-4 bg-[#022A29]">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Leads</p>
            <p className="text-2xl font-bold">{stats.leads}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Conversiones
            </p>
            <p className="text-2xl font-bold">{stats.conversions}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Tasa de Conversión
            </p>
            <p className="text-2xl font-bold">{stats.conversionRate}%</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Gasto</p>
            <p className="text-2xl font-bold">${stats.expense.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Costo por Lead
            </p>
            <p className="text-2xl font-bold">${stats.leadCost.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Costo por Conversión
            </p>
            <p className="text-2xl font-bold">
              ${stats.conversionCost.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
