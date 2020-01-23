const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

const jsonParser = bodyParser.json();
const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));

let comments = [
  {
    id: uuidv4(),
    titulo: 'Pongame 100',
    contenido: 'Este es un comentario de prueba.',
    autor: 'Osvaldo Alvarez',
    date: new Date()
  },
  {
    id: uuidv4(),
    titulo: 'Pongale 100 profe',
    contenido: 'Esta aplicacion merece sacar 100 en el lab.',
    autor: 'Mariano Uvalle',
    date: new Date()
  },
  {
    id: uuidv4(),
    titulo: 'Que buen laboratorio',
    contenido: 'El laboratorio esta bien hecho.',
    autor: 'Osvaldo Alvarez',
    date: new Date()
  },
];

app.get('/blog-api/comentarios', (req, res) => {
  return res.status(200).json(comments);
});

app.get('/blog-api/comentarios-por-autor', (req, res) => {
  const {autor} = req.query;

  if(!autor){
    res.statusMessage = 'Autor no valido.';
    return res.status(406).send();
  }

  let commentsFound = comments.filter(comment => {
    if(comment.autor === autor)
      return comment;
  });

  if(commentsFound.length > 0){
    return res.status(201).json(commentsFound);
  }
  else{
    res.statusMessage = 'No se ha encontrado ningun comentario con ese autor.';
    return res.status(404).send();
  }
});

app.post('/blog-api/nuevo-comentario', jsonParser, (req, res) => {
  const {titulo, contenido, autor} = req.body;
  console.log(req.body);

  if(!(titulo && contenido && autor)){
    res.statusMessage = 'Tienes que proveer al menos uno de los siguientes: titulo, contenido, autor.';
    return res.status(406).send();
  }
  
  let comment = req.body;
  comment.id = uuidv4();
  comment.date = new Date();
  comments.push(comment);

  return res.status(201).json(comment);
});

app.delete('/blog-api/remover-comentario/:id', jsonParser, (req, res) => {
  const {id} = req.params;
  const length = comments.length;

  comments = comments.filter(comment => id !== comment.id);

  if(comments.length !== length){
    return res.status(200).json({});
  }
  else{
    res.statusMessage = 'No se ha encontrado ningun comentario con ese ID.';
    return res.status(404).send();
  }
});

app.put('/blog-api/actualizar-comentario/:id', jsonParser, (req, res) => {
  const {id, titulo, contenido, autor} = req.body;

  if(!id){
    res.statusMessage = 'ID no valido.';
    return res.status(406).send();
  }

  if(id != req.params.id){
    res.statusMessage = 'No coincide la ID de los parametros con la del contenido.';
    return res.status(409).send();
  }

  if(!(titulo || contenido || autor)){
    res.statusMessage = 'Tienes que proveer al menos uno de los siguientes: titulo, contenido, autor.';
    return res.status(406).send();
  }

  let index = -1;
  comments.forEach((comment, i) => {
    if(comment.id == id)
      index = i;
  });

  if(index < 0){
    res.statusMessage = 'No se encontro ningun comentario con ese ID.';
    return res.status(404).send();
  }
  else{
    if(titulo)
      comments[index].titulo = titulo;
    if(contenido)
      comments[index].contenido = contenido;
    if(autor)
      comments[index].autor = autor;
  }

  return res.status(202).json(comments[index]);
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});