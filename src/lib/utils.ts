import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get team initials/abbreviation from team name
 * Examples: "Manchester United" -> "MU", "Real Madrid" -> "RM", "Barcelona" -> "B"
 */
export function getTeamInitials(teamName: string): string {
  // Common team abbreviations
  const abbreviations: Record<string, string> = {
    'manchester united': 'MU',
    'manchester city': 'MC',
    'arsenal': 'A',
    'chelsea': 'C',
    'liverpool': 'L',
    'tottenham': 'T',
    'real madrid': 'RM',
    'barcelona': 'B',
    'atletico madrid': 'AM',
    'bayern munich': 'BM',
    'borussia dortmund': 'BD',
    'juventus': 'J',
    'ac milan': 'ACM',
    'inter milan': 'IM',
    'paris saint-germain': 'PSG',
  }

  const normalized = teamName.toLowerCase().trim()
  if (abbreviations[normalized]) {
    return abbreviations[normalized]
  }

  // Fallback: extract initials from words
  const words = teamName.split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }

  // Single word: take first 2-3 letters
  return teamName.substring(0, Math.min(2, teamName.length)).toUpperCase()
}

