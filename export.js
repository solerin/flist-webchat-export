// (1) Visit https://www.f-list.net and open the browser console by pressing F12

// (2) Copy the content of https://cdn.jsdelivr.net/npm/idb@7/build/umd.js
// into the browser console and press Enter.
// The library contains functions for easier access to IndexedDB.
// See https://www.npmjs.com/package/idb

// (3) Copy the following code into the browser console and press Enter.
// It exports the saved logs and opens a download dialog for
// "export.json"


async function export_logs() {
	let databases = JSON.parse(localStorage["fchat.characters"])
	let result = {}
	for(const database of databases) {
		console.log("Exporting " + database)
		let db = await idb.openDB("logs-" + database);
		let conversations = await db.getAll("conversations")
		let logs = await db.getAll("logs")
		let data = {"conversations": conversations, "logs": logs}
		result[database] = data
	}
	blob = new Blob([JSON.stringify(result)])
	link = document.createElement("a")
	link.download = "export.json"
	link.href = URL.createObjectURL(blob)
	link.click()
	URL.revokeObjectURL(link.href)
}
await window.setTimeout(export_logs, 5000)
