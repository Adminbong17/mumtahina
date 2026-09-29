import fs from 'fs';
import path from 'path';
import { SiteData } from './types';
import { initialSiteData } from '@/data/initialData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export function getDb(): SiteData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialSiteData, null, 2), 'utf-8');
      return initialSiteData;
    }

    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return parsed as SiteData;
  } catch (error) {
    console.error("Error reading database file, returning initial data:", error);
    return initialSiteData;
  }
}

export function saveDb(data: SiteData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error saving to database file:", error);
    return false;
  }
}

export function resetDbToDefault(): SiteData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(initialSiteData, null, 2), 'utf-8');
    return initialSiteData;
  } catch (error) {
    console.error("Error resetting database:", error);
    return initialSiteData;
  }
}
