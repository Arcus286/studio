'use server';
/**
 * @fileOverview A simulated database flow using a JSON file.
 * This is a temporary solution for prototyping collaborative features
 * and is NOT suitable for production use.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'ai', 'db.json');

// Define a schema for the entire database for validation.
const DbSchema = z.object({
  tasks: z.any(),
  projects: z.any(),
  sprints: z.any(),
  notifications: z.any(),
  users: z.any(),
  columns: z.any(),
});
type Db = z.infer<typeof DbSchema>;

const DatabaseGetInputSchema = z.object({
  key: z.enum(['tasks', 'projects', 'sprints', 'notifications', 'users', 'columns']),
});

const DatabaseSetInputSchema = z.object({
  key: z.enum(['tasks', 'projects', 'sprints', 'notifications', 'users', 'columns']),
  value: z.any(),
});

/**
 * Reads the entire database from the JSON file.
 */
async function readDb(): Promise<Db> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data) as Db;
  } catch (error) {
    // If the file doesn't exist or is invalid, return a default structure.
    console.error("Error reading db.json, returning default. Error:", error);
    return { tasks: [], projects: [], sprints: [], notifications: [], users: [], columns: [] };
  }
}

/**
 * Writes the entire database to the JSON file.
 */
async function writeDb(data: Db): Promise<void> {
  // Validate data before writing
  const validatedData = DbSchema.parse(data);
  await fs.writeFile(DB_PATH, JSON.stringify(validatedData, null, 2));
}

/**
 * A Genkit flow to get a value from our JSON database.
 */
export const getDbValue = ai.defineFlow(
  {
    name: 'getDbValue',
    inputSchema: DatabaseGetInputSchema,
    outputSchema: z.any(),
  },
  async ({ key }) => {
    const db = await readDb();
    return db[key];
  }
);

/**
 * A Genkit flow to set a value in our JSON database.
 */
export const setDbValue = ai.defineFlow(
  {
    name: 'setDbValue',
    inputSchema: DatabaseSetInputSchema,
    outputSchema: z.void(),
  },
  async ({ key, value }) => {
    const db = await readDb();
    db[key] = value;
    await writeDb(db);
  }
);

/**
 * A flow to get the entire DB state at once.
 */
export const getFullDbState = ai.defineFlow(
    {
        name: 'getFullDbState',
        inputSchema: z.void(),
        outputSchema: DbSchema,
    },
    async () => {
        return await readDb();
    }
);
