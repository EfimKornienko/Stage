import Dexie from 'dexie'

export const db = new Dexie('stageDb')
db.version(1).stores({
  jwt: '&user'
});
db.version(2).stores({
  category: '&user'
});