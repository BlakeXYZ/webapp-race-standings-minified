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
    const headerClass = "font-bold text-xs sm:text-base inline-block -rotate-[35deg] origin-center" // Rotate only the text
    const cellPrimary = "text-xs sm:text-sm p-2"
    const cellSecondary = "text-xs sm:text-sm p-2 text-slate-500 dark:text-slate-400" // For less important info
    const stickyOverallLeft = "bg-background dark:bg-slate-900 sticky left-0 z-10 font-semibold w-10 min-w-10 max-w-10 text-center"
    const stickyDriverLeft = "bg-background dark:bg-slate-900 sticky left-[40px] z-10 font-semibold max-w-[100px] sm:max-w-[500px] overflow-hidden text-ellipsis"

    const rowDark = "bg-slate-100 dark:bg-slate-800"
    const rowLight = "bg-background dark:bg-slate-900"

    return (
        <Card className="overflow-hidden">
          <div className="max-h-[600px] overflow-auto [mask-image:linear-gradient(to_right,black_90%,transparent)]">
            <Table>
                <TableHeader className="sticky top-0 z-20 bg-background dark:bg-slate-900">
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
                    {drivers.map((driver, index) => {  
                        const isOdd = index % 2 === 1; //use array position to determine if row is odd or even for styling
                        
                        return (
                        <TableRow key={driver.overall} className={isOdd ? `${rowDark}` : `${rowLight}`}>
                            <TableCell className={`${cellPrimary} ${stickyOverallLeft} ${isOdd ? `${rowDark}` : `${rowLight}`}`}>
                              #{driver.overall}
                            </TableCell>
                            <TableCell className={`${cellPrimary} ${stickyDriverLeft} ${isOdd ? `${rowDark}` : `${rowLight}`}`}>
                              {driver.driver.toUpperCase()}
                            </TableCell>
                            <TableCell className={`${cellSecondary} font-semibold max-w-[170px] sm:max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap`}>{driver.car}</TableCell>
                            <TableCell className={`${cellSecondary} text-center`}>{driver.class}</TableCell>
                            <TableCell className={`${cellSecondary} text-center`}>{driver.class_rank}</TableCell>
                            <TableCell className={`${cellSecondary} text-center font-semibold`}>{driver.avg_time}s</TableCell>
                            <TableCell className={`${cellSecondary} text-center`}>
                              {driver.differential ? `+${driver.differential}s` : '--'}
                            </TableCell>
                            <TableCell className={`${cellSecondary} text-center`}>{driver.runs}</TableCell>
                            <TableCell className={`${cellPrimary} text-center text-green-600 dark:text-green-400 font-semibold`}>
                              {driver.min}s
                            </TableCell>
                            <TableCell className={`${cellPrimary} text-center text-red-600 dark:text-red-400 font-semibold`}>
                              {driver.max}s
                            </TableCell>
                            <TableCell className={`${cellSecondary} text-center`}>{driver.min_max_diff}s</TableCell>
                            <TableCell className={`${cellSecondary} text-center`}>{driver.raw_time}s</TableCell>
                            <TableCell className={`${cellPrimary} text-center ${Number(driver.cones) > 0 ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                              {driver.cones}
                            </TableCell>
                            <TableCell className={`${cellPrimary} text-center ${Number(driver.penalty) > 0 ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                              {driver.penalty}s
                            </TableCell>
                            <TableCell className={`${cellPrimary} text-center font-medium pr-8`}>{driver.total_time}s</TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
          </div>
        </Card>
    )
}