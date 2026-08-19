import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Card } from '@/components/ui/card'
import { Driver } from '@/types/event'


export default function DriverTable({ drivers }: { drivers: Driver[] }) {
    // Reusable style strings
    const headerClass = "font-bold text-sm inline-block -rotate-[75deg] origin-center" // Rotate only the text
    const cellPrimary = "text-sm"
    const cellSecondary = "text-sm text-slate-500 dark:text-slate-400" // For less important info
    const stickyOverallLeft = "bg-background sticky left-0 z-10 font-semibold w-10 min-w-10 max-w-10 text-center"
    const stickyDriverLeft = "bg-background sticky left-[40px] z-10 font-semibold max-w-[100px] sm:max-w-[500px] overflow-hidden text-ellipsis"

    const rowDark = "bg-slate-100 dark:bg-slate-800/50"
    const rowLight = "bg-background dark:bg-slate-900/50"

    return (
        <Card className="overflow-hidden">
          <div className="max-h-[600px] overflow-auto">
            <Table>
                <TableHeader className="sticky top-0 z-20 bg-background">
                    <TableRow className="h-24">
                        <TableHead className={`${stickyOverallLeft} z-40`}>
                          <span className={headerClass}>Overall</span>
                        </TableHead>
                        <TableHead className={`${stickyDriverLeft} z-30`}>
                          <span className={headerClass}>Driver</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Car</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Class</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Class Rank</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Avg</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Gap</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Runs</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Min</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Max</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Diff</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Raw</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Cones</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Penalty</span>
                        </TableHead>
                        <TableHead>
                          <span className={headerClass}>Total</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {drivers.map((driver) => {  
                        const isOdd = driver.overall % 2 === 1
                        
                        return (
                        <TableRow key={driver.overall} className={isOdd ? `${rowDark}` : `${rowLight}`}>
                            <TableCell className={`${cellPrimary} ${stickyOverallLeft} ${isOdd ? `${rowDark}` : `${rowLight}`}`}>
                              #{driver.overall}
                            </TableCell>
                            <TableCell className={`${cellPrimary} ${stickyDriverLeft} ${isOdd ? `${rowDark}` : `${rowLight}`}`}>
                              {driver.driver.toUpperCase()}
                            </TableCell>
                            <TableCell className={cellSecondary}>{driver.car}</TableCell>
                            <TableCell className={cellSecondary}>{driver.class}</TableCell>
                            <TableCell className={cellSecondary}>{driver.class_rank}</TableCell>
                            <TableCell className={`${cellPrimary} font-semibold`}>{driver.avg_time}s</TableCell>
                            <TableCell className={cellSecondary}>
                              {driver.differential ? `+${driver.differential}s` : '--'}
                            </TableCell>
                            <TableCell className={cellSecondary}>{driver.runs}</TableCell>
                            <TableCell className={`${cellPrimary} text-green-600 dark:text-green-400 font-semibold`}>
                              {driver.min}s
                            </TableCell>
                            <TableCell className={`${cellPrimary} text-red-600 dark:text-red-400 font-semibold`}>
                              {driver.max}s
                            </TableCell>
                            <TableCell className={cellSecondary}>{driver.min_max_diff}s</TableCell>
                            <TableCell className={cellSecondary}>{driver.raw_time}s</TableCell>
                            <TableCell className={`${cellPrimary} ${Number(driver.cones) > 0 ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                              {driver.cones}
                            </TableCell>
                            <TableCell className={`${cellPrimary} ${Number(driver.penalty) > 0 ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                              {driver.penalty}s
                            </TableCell>
                            <TableCell className={`${cellPrimary} font-medium`}>{driver.total_time}s</TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
          </div>
        </Card>
    )
}