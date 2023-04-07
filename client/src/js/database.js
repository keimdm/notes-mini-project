// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    openDB('miniproj', 1, {
        upgrade(db) {
          if (db.objectStoreNames.contains('miniproj')) {
            console.log('miniproj database already exists');
            return;
          }
          db.createObjectStore('miniproj', { keyPath: 'id', autoIncrement: true });
          console.log('miniproj database created');
        },
      });
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    console.log('Post to the database');

  // Create a connection to the database database and version we want to use.
  const miniprojDb = await openDB('miniproj', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = miniprojDb.transaction('miniproj', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('miniproj');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ name, home, cell, email });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    console.log('GET all from the database');

    // Create a connection to the database database and version we want to use.
    const miniprojDb = await openDB('miniproj', 1);
  
    // Create a new transaction and specify the database and data privileges.
    const tx = miniprojDb.transaction('miniproj', 'readonly');
  
    // Open up the desired object store.
    const store = tx.objectStore('miniproj');
  
    // Use the .getAll() method to get all data in the database.
    const request = store.getAll();
  
     // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
    const miniprojDb = await openDB('miniproj', 1);
    const tx = miniprojDb.transaction('miniproj', 'readwrite');
    const store = tx.objectStore('miniproj');
    const request = store.delete(id);
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb();
