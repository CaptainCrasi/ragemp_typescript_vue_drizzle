import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import  * as schema from './schema/index'
const db = drizzle(process.env.DATABASE_URL as string)
export {db, schema} 
