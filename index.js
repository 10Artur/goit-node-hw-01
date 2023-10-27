const Contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const listContact = await Contacts.listContacts();
            console.table(listContact);
            break;

        case "get":
            const getContactId = await Contacts.getContactById(id);
            console.log(getContactId);
            break;

        case "add":
            const newContact = await Contacts.addContact({ name, email, phone });
            console.log(newContact);
            break;

        case "remove":
            const delContact = await Contacts.removeContact(id);
            console.log(delContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);