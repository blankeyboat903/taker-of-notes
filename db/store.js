const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
var id = "id" + Math.random().toString(16).slice(2)
const uuidv1 = require('uuid/v1')

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }
  
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }
  
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
  
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
  
      return parsedNotes;
  });
  }
    
  
  addNote(note) {
      const { title, text } = note;
    
      if (!title || !text) {
        throw new Error("Note 'title' and 'text' cannot be blank");
      }
    
     
      const newNote = { title, text, id: uuidv1() };
    
      
      return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
  }
}
  
  
  module.exports = new Store();