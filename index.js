const { program } = require('commander');

const { listContacts,
	getContactById,
	addContact,
	removeContactById
} = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const allContacts = await listContacts();
			console.table(allContacts);
			break;

		case "getById":
			const oneContact = await getContactById(id);
			console.table(oneContact);
			break;

		case "add":
			const newContact = await addContact({ name, email, phone });
			console.table(newContact);
			break;

		case "removeById":
			const removeContact = await
				removeContactById(id);
			console.table(removeContact);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
};

program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

invokeAction(options);