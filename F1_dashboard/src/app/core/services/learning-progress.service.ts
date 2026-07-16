import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { F1101Entry, F1101Tier, F1_101_ENTRIES, F1_101_TIERS } from '../constants/f1-101-content';

const READ_KEY = 'pitwall_101_read';

export interface LevelInfo {
  levelNumber: number;
  ladder: string;
  stageTitle: string;
  readCount: number;
  totalCount: number;
  pct: number;
  stagePct: number;
  certified: boolean;
}

/**
 * Single source of truth for F1 101 learning progress — shared by the
 * Pit Briefing page and the dashboard's licence widget. Persisted in localStorage.
 */
@Injectable({ providedIn: 'root' })
export class LearningProgressService {

  readonly tiers = F1_101_TIERS;
  readonly entries = F1_101_ENTRIES;

  private readIds = new Set<string>(this.load());
  private levelSubject = new BehaviorSubject<LevelInfo>(this.computeLevel());

  readonly level$: Observable<LevelInfo> = this.levelSubject.asObservable();

  isRead(id: string): boolean {
    return this.readIds.has(id);
  }

  toggleRead(id: string): void {
    if (this.readIds.has(id)) {
      this.readIds.delete(id);
    } else {
      this.readIds.add(id);
    }
    localStorage.setItem(READ_KEY, JSON.stringify([...this.readIds]));
    this.levelSubject.next(this.computeLevel());
  }

  get snapshot(): LevelInfo {
    return this.levelSubject.value;
  }

  tierDone(tier: F1101Tier): number {
    return tier.entryIds.filter(id => this.readIds.has(id)).length;
  }

  tierComplete(tier: F1101Tier): boolean {
    return this.tierDone(tier) === tier.entryIds.length;
  }

  /** Index of the stage the user should be working on: first incomplete tier. */
  get currentTierIndex(): number {
    const idx = this.tiers.findIndex(t => !this.tierComplete(t));
    return idx === -1 ? this.tiers.length - 1 : idx;
  }

  /** The next few unread entries from the current stage — for "continue learning" CTAs. */
  nextUp(count: number): F1101Entry[] {
    const tier = this.tiers[this.currentTierIndex];
    return tier.entryIds
      .filter(id => !this.readIds.has(id))
      .slice(0, count)
      .map(id => this.entries.find(e => e.id === id))
      .filter((e): e is F1101Entry => !!e);
  }

  private computeLevel(): LevelInfo {
    const readCount = this.entries.filter(e => this.readIds.has(e.id)).length;
    const totalCount = this.entries.length;
    const certified = this.tiers.every(t => this.tierComplete(t));
    const current = this.tiers[this.currentTierIndex];
    const stagePct = current.entryIds.length
      ? Math.round((this.tierDone(current) / current.entryIds.length) * 100)
      : 0;
    return {
      levelNumber: certified ? this.tiers.length : current.level,
      ladder: certified ? 'Certified Race Fan' : current.ladder,
      stageTitle: certified ? 'Every stage complete' : current.title,
      readCount,
      totalCount,
      pct: totalCount ? Math.round((readCount / totalCount) * 100) : 0,
      stagePct: certified ? 100 : stagePct,
      certified
    };
  }

  private load(): string[] {
    try {
      return JSON.parse(localStorage.getItem(READ_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}
