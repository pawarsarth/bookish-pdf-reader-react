
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from './ui/toggle';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <Toggle 
      pressed={isDark} 
      onPressedChange={onToggle}
      aria-label="Toggle theme"
      className="bg-secondary/50 hover:bg-secondary transition-colors"
    >
      {isDark ? (
        <Moon className="h-4 w-4 text-primary-foreground" />
      ) : (
        <Sun className="h-4 w-4 text-primary-foreground" />
      )}
      <span className="ml-2 text-xs text-primary-foreground">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </Toggle>
  );
};

export default ThemeToggle;
