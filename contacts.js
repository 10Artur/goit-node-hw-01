const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id === contactId) || null;
    return contact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const result = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return result;
}

async function addContact(data) {
    const contacts = await listContacts();

    const newContact = {
        id: crypto.randomUUID(),
        ...data,
    };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};