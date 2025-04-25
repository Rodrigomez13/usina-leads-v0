export function ClientDistribution({ serverId }: { serverId: string }) {
  // Simulated data for client distribution
  const clients = [
    { name: "ATENEA", value: 26, color: "#148f77" },
    { name: "EROS", value: 33, color: "#45b39d" },
    { name: "FENIX", value: 21, color: "#0e6251" },
    { name: "GANA24", value: 8, color: "#a2d9ce" },
    { name: "FORTUNA", value: 7, color: "#7dcea0" },
    { name: "FLASHBET", value: 5, color: "#d5f5e3" },
  ]

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <div key={client.name} className="flex items-center">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{client.name}</span>
              <span className="text-sm font-medium">{client.value}%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${client.value}%`,
                  backgroundColor: client.color,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
