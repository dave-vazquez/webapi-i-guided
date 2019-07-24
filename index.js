const express = require("express");
const db = require("./data/hubs-model.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send('Hello world from express!!'); //send is an express method
});

server.get('/now', (req, res) => {
	const now = new Date().toISOString();
	res.send(now);
})

server.get('/hubs', (req, res) => {
	db.find()
	.then(hubs => { // this is called a then clause
		res.status(200).json(hubs);
	})
	.catch(err => {
		res.status(500).json({success: false, err})
	})
});

server.post('/hubs', (req, res) => {
	const hubInfo = req.body; //JSON object ?? 
	console.log(hubInfo);

	db.add(hubInfo)
	.then(hub => {
		res.status(201).json({success:true, hub});
	})
	.catch(err => {
		res.status(500).json({success: false, err});
	})
})

server.put('/hubs/:id', (req, res) => {
	const {id} = req.params;
	const hubInfo = req.body;
	console.log(hubInfo)

	db.update(id, hubInfo)
	.then(updated => {
		if(updated) {
			res.status(200).json({success: true, updated})
		} else {
			res.status(404).json({sucess:false, message:'I cannot find the hub you are looking for.'})
		}
	})
	.catch(err => {
		res.status(500).json({success:false, err})
	})
})

server.delete('/hubs/:id', (req, res) => {
	const {id} = req.params;

	db.remove(id)
	.then(deleted => {
		if(deleted) {
			res.status(204).end();
		} else {
			res.status(404).json({success: false, message: "I cannot find the hub you are looking for"});
		}
	})
	.catch(err => {
		req.status(500).json({success: false, err});
	})
})

server.listen(4000, () => {
  console.log("server listening on port 4000");
});
