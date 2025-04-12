const express = require('express');
const Model = require('../model/model');

const router = express.Router()

//POST a new record
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get All Records
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Get Single Record
router.get('/getOne/:id', async (req,res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Find Record By ID and Update the Record   
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

//Find Record By ID and Delete It
router.delete('/delete/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted...`);
    } catch (error) {
        res.json(400).message({ message: error.message });
    }
})

module.exports = router;





// //GET all students
// app.get('/students/all', (req, res) => {
//     db.all('SELECT * FROM students', (err, rows) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).send('Internal Server Error');
//         }
//         res.send(rows);
//     });

// });

// //GET student by id
// app.get('/students/:id', (req, res) => {

//     const{ id } = req.params;
//     db.get('SELECT * FROM students WHERE id = ?', [id] , (err, row) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).send('Internal Server Error');
//         }
//         if (row) {
//             res.send(row);
//         } else {
//             res.status(404).send('Not Found');
//         }
//     });
// });

// //POST a new student
// app.post('/student', (req, res) => {
//     const { studentName, studentEmail, studentPhone } = req.body;
//     var dateTime = new Date();
//     db.run('INSERT INTO students (name, email, phone, created_at) VALUES (?, ?, ?, ?)',
//          [studentName, studentEmail, studentPhone, dateTime], (err) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).send('Internal Server Error');
//         } else {
//             const id = this.lastID;
//             res.status(201).send({id, studentName, studentEmail, studentPhone, created_at: dateTime});
//         }
//     });
// });

// //PUT updated student by id
// app.put('/students/:id', (req, res) => {

//     const { name, email, phone } = req.body;
//     const { id } = req.params;
//     var dateTime = new Date();
//     db.run('UPDATE students SET name = ?, email = ?, phone = ?, updated_at = ? WHERE id = ?',
//         [name, email, phone, dateTime, id], (err) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.status(200).send({id, name, email, phone, updated_at: dateTime});
//         }
//     });
// });

// //DELETE student by id
// app.delete('/students/:id', (req, res) => {

//     const { id } = req.params;
//     db.run('DELETE FROM students WHERE id = ?', [id], (err) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.status(204).send();
//         }
//     });
// });

