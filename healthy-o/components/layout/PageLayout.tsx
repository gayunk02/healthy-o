import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ title, description, children, className }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <Card className={`w-full max-w-[680px] mx-4 ${className || ''}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-[#0B4619]">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-center font-medium text-gray-600">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-8">
          {children}
        </CardContent>
      </Card>
    </div>
  );
} 