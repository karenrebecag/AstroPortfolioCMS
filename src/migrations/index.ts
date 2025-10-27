import * as migration_20251009_155439_initial from './20251009_155439_initial';
import * as migration_20251027_155814 from './20251027_155814';

export const migrations = [
  {
    up: migration_20251009_155439_initial.up,
    down: migration_20251009_155439_initial.down,
    name: '20251009_155439_initial',
  },
  {
    up: migration_20251027_155814.up,
    down: migration_20251027_155814.down,
    name: '20251027_155814'
  },
];
