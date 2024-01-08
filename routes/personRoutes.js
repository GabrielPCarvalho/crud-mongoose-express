const router = require('express').Router();

const Person = require('../models/Person');

// CREATE - Criacao de dados
router.post('/', async (req, res) => {
  const { name, age, office, salary, approved } = req.body;

  const person = {
    name,
    age,
    office,
    salary,
    approved,
  };

  if(!name) {
    res.status(422).json({ error: 'Nome obrigatório' })
    return;
  }

  try {
    await Person.create(person);

    res.status(201).json({ message: 'Pessoa criada com sucesso' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar pessoa' });
  }
});

// READ - Leitura de dados
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pessoas', err });
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if(!person) {
      res.status(422).json({ message: 'Pessoa não encontrada' });
      return;
    }

    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pessoa', err });
  } 
})

//UPDATE - Atualizacao de dados (PUT e PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  const { name, age, office, salary, approved } = req.body;

  const person = {
    name,
    age,
    office,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if(updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'Pessoa não encontrada' });
      return;
    }

    res.status(200).json(updatedPerson);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar pessoa', err });
  }
})

// DELETE - Delecao de dados
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if(!person) {
    res.status(422).json({ message: 'Pessoa não encontrada' });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: 'Pessoa deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar pessoa', err });
  }
})


module.exports = router;