const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const updateContacts = async (contacts) => {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
const listContacts = async () => {
	try {
		const data = await fs.readFile(contactsPath);
		return JSON.parse(data);
	} catch (error) {
		console.error(error.message);
	}
};

const getContactById = async (contactId) => {
	try {
		const contacts = await listContacts();
		const result = contacts.find(item => item.id === contactId);
		return result || null;
	} catch (error) {
		console.error(error.message);
	}
}

const addContact = async (data) => {
	try {
		const contacts = await listContacts();
		const newContact = { id: nanoid(), ...data };
		contacts.push(newContact);
		await updateContacts(contacts);
		return newContact;
	} catch (error) {
		console.error(error.message);
	}
}

const removeContactById = async (contactId) => {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex(item => item.id === contactId);
		if (index === -1) { return null };
		const [result] = contacts.splice(index, 1);
		await updateContacts(contacts);
		return result;
	} catch (error) {
		console.error(error.message);
	}
}

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContactById
};