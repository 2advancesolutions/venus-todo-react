import React from 'react';
import styles from './StatsBar.module.css';

export default function StatsBar({ pending, completed }) {
  const total = pending + completed;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className={styles.bar}>
      <div className={styles.labels}>
        <span className={styles.stat}>
          <span className={styles.dot} style={{ background: 'var(--accent-purple)' }} />
          {pending} pending
        </span>
        <span className={styles.pct}>{pct}% done</span>
        <span className={styles.stat}>
          <span className={styles.dot} style={{ background: 'var(--accent-green)' }} />
          {completed} done
        </span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
