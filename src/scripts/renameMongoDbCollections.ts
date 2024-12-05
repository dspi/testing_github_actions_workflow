import {closeDB, connectToDB/*, getDB*/} from '../helpers/mongodb';

export const renameCollections = async (collections: string[], prefix: string): Promise<void> => {
    console.log('This is "renameCollections"');
    
    const db = await connectToDB(); // Ensure the DB is connected

    try {
        for (const oldName of collections) {
            const newName = `${prefix}${oldName}`;
            try {
                console.log(`Renaming: ${oldName} -> ${newName}`);
                await db.collection(oldName).rename(newName);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`Failed to rename collection ${oldName}:`, error.message);
                }
                else {
                    console.error(`Failed to rename collection ${oldName}`);
                }
            }
        }
    } catch (error) {
        console.error('Error during renaming collections:', error);
    } finally {
        await closeDB(); // Close the connection here
    }
}

renameCollections(['doesNotExist', `launches`], 'hardcoded_');
