// ============================================================================
// CARD COMPONENTS - Pre-styled div containers (like Bootstrap cards)
// ============================================================================
// These are reusable components from shadcn/ui
// You can think of them as fancy <div> elements with built-in styling
// 
// Usage in your code:
//   <Card>
//     <CardHeader>
//       <CardTitle>Title Here</CardTitle>
//       <CardDescription>Description here</CardDescription>
//     </CardHeader>
//     <CardContent>
//       Your content here
//     </CardContent>
//   </Card>
// ============================================================================

import * as React from "react"
import { cn } from "@/lib/utils"  // Helper function to combine CSS classes


// ----------------------------------------------------------------------------
// CARD - Main container (like <div class="card"> in Bootstrap)
// ----------------------------------------------------------------------------
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // className is just like class="" in HTML
    // These are Tailwind CSS classes (utility classes for styling)
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className  // Allows you to add more classes when using <Card className="...">
    )}
    {...props}  // Passes through any other props (like onClick, id, etc.)
  />
))
Card.displayName = "Card"


// ----------------------------------------------------------------------------
// CARD HEADER - Top section of the card
// ----------------------------------------------------------------------------
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"


// ----------------------------------------------------------------------------
// CARD TITLE - Title text (like <h3> but styled)
// ----------------------------------------------------------------------------
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"


// ----------------------------------------------------------------------------
// CARD DESCRIPTION - Subtitle/description text
// ----------------------------------------------------------------------------
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"


// ----------------------------------------------------------------------------
// CARD CONTENT - Main content area
// ----------------------------------------------------------------------------
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"


// ----------------------------------------------------------------------------
// CARD FOOTER - Bottom section (optional)
// ----------------------------------------------------------------------------
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"


// Export all components so we can import them elsewhere
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }


// ============================================================================
// HOW TO USE THESE COMPONENTS
// ============================================================================
// 
// In your App.tsx or any other file:
// 
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
// 
// <Card>
//   <CardHeader>
//     <CardTitle>My Card Title</CardTitle>
//   </CardHeader>
//   <CardContent>
//     <p>This is the content of my card</p>
//   </CardContent>
// </Card>
// 
// ============================================================================
// CUSTOMIZATION
// ============================================================================
// 
// Add your own classes:
//   <Card className="bg-blue-500 shadow-xl">
// 
// Add click handlers:
//   <Card onClick={() => alert('Clicked!')}>
// 
// STUB: Create more card variants here (e.g., CardVariantSuccess, etc.)
// ============================================================================
