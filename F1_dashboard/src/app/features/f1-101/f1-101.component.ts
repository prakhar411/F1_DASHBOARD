import { Component } from '@angular/core';
import { F1101Category, F1101Entry, F1101Tier, F1_101_CATEGORIES, F1_101_ENTRIES, F1_101_TIERS } from '../../core/constants/f1-101-content';
import { LearningProgressService } from '../../core/services/learning-progress.service';

const LANG_KEY = 'pitwall_101_lang';

@Component({
  selector: 'app-f1-101',
  templateUrl: './f1-101.component.html',
  styleUrls: ['./f1-101.component.css']
})
export class F1101Component {

  categories = F1_101_CATEGORIES;
  entries = F1_101_ENTRIES;
  tiers = F1_101_TIERS;

  lang: 'en' | 'hi' = (localStorage.getItem(LANG_KEY) === 'hi') ? 'hi' : 'en';
  view: 'journey' | 'glossary' = 'journey';
  activeCategory = 'all';
  searchTerm = '';

  /** Soft lock: future stages start collapsed, but the user can force any open. */
  private forcedOpen = new Set<number>();

  constructor(public progress: LearningProgressService) { }

  setLang(lang: 'en' | 'hi'): void {
    this.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
  }

  toggleRead(id: string, event: Event): void {
    event.stopPropagation();
    this.progress.toggleRead(id);
  }

  isRead(id: string): boolean {
    return this.progress.isRead(id);
  }

  // ---------- Journey view ----------

  entriesFor(tier: F1101Tier): F1101Entry[] {
    return tier.entryIds
      .map(id => this.entries.find(e => e.id === id))
      .filter((e): e is F1101Entry => !!e);
  }

  isLocked(index: number): boolean {
    return index > this.progress.currentTierIndex && !this.forcedOpen.has(index);
  }

  forceOpen(index: number): void {
    this.forcedOpen.add(index);
  }

  isCurrent(index: number): boolean {
    return index === this.progress.currentTierIndex && !this.progress.snapshot.certified;
  }

  tierDone(tier: F1101Tier): number {
    return this.progress.tierDone(tier);
  }

  tierComplete(tier: F1101Tier): boolean {
    return this.progress.tierComplete(tier);
  }

  tierPct(tier: F1101Tier): number {
    return tier.entryIds.length ? Math.round((this.tierDone(tier) / tier.entryIds.length) * 100) : 0;
  }

  // ---------- Glossary view ----------

  get filteredEntries(): F1101Entry[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.entries.filter(e => {
      if (this.activeCategory !== 'all' && e.category !== this.activeCategory) {
        return false;
      }
      if (!term) {
        return true;
      }
      return e.title.toLowerCase().includes(term)
        || e.en.toLowerCase().includes(term)
        || e.hi.toLowerCase().includes(term);
    });
  }

  category(id: string): F1101Category | undefined {
    return this.categories.find(c => c.id === id);
  }

  /** Entry-specific accent (real flag/tyre colours); falls back to the category colour. */
  private static readonly ACCENTS: Record<string, string> = {
    'green-flag': '#4ade80',
    'yellow-flag': '#facc15',
    'blue-flag': '#60a5fa',
    'white-flag': '#e5e7eb',
    'red-flag': '#ef4444',
    'black-flag': '#9ca3af',
    'black-orange': '#fb923c',
    'chequered-flag': '#e5e7eb',
    'compounds': '#ef4444',
    'wets': '#60a5fa',
    'two-compound-rule': '#facc15'
  };

  entryAccent(e: F1101Entry): string {
    return F1101Component.ACCENTS[e.id] ?? this.category(e.category)?.color ?? '#e10600';
  }

  countFor(categoryId: string): number {
    return this.entries.filter(e => e.category === categoryId).length;
  }

  trackById(_index: number, entry: F1101Entry): string {
    return entry.id;
  }
}
