import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getPillarOptions, type CanonicalPillarKey } from '@/lib/pillarTags';

interface PillarTagSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Dropdown component for selecting a canonical pillar tag
 * 
 * IMPORTANT: This component enforces the canonical key system.
 * It displays human-readable labels but stores canonical keys.
 * 
 * @see /docs/DRIFT_GUARD.md - Free-text input is prohibited
 */
export function PillarTagSelect({
  value,
  onChange,
  placeholder = "Select a category",
  disabled = false,
}: PillarTagSelectProps) {
  const options = getPillarOptions();

  return (
    <Select 
      value={value || ''} 
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default PillarTagSelect;
