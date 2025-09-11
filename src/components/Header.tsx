import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ocean data..."
            className="pl-10 bg-background/50 border-border/50 focus:bg-background"
          />
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-destructive-foreground rounded-full"></span>
            </span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-ocean-light text-ocean-deep text-sm">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">Jane Doe</p>
              <p className="text-xs text-muted-foreground">Ocean Analyst</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;