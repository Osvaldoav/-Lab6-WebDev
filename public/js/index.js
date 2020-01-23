function displayComments(){
  $.ajax({
    url: '/blog-api/comentarios',
    method: 'GET',
    dataType: 'json',
    success: response => {
      $('#allCommentsList').empty();
      response.forEach(comment => {
        const {id, titulo, contenido, autor, date} = comment;
        $('#allCommentsList').append(`
          <li>
            <h4>${titulo}</h4>
            <p class="commentContent">${contenido}</p>
            <p>By: ${autor}</p>
            <p>ID: ${id}</p>
            <p>Date: ${date}</p>
          </li>
        `);
      });
    },
    error: ({status, statusText}) => {
      alert(`Status code ${status}\n${statusText}`);
    }
  });
}

function init(){
  displayComments();
}

$('#addComment').on('submit', function(e) {
  e.preventDefault();
  const titulo = $(this).find('#titulo').val();
  const autor = $(this).find('#autor').val();
  const contenido = $(this).find('textarea').val();

  $.ajax({
    url: '/blog-api/nuevo-comentario',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({titulo, autor, contenido}),
    success: response => {
      location.reload();
    },
    error: ({status, statusText}) => {
      alert(`Status code ${status}\n${statusText}`);
    }
  });
});

$('#modifyComment').on('submit', function(e) {
  e.preventDefault();
  const id = $(this).find('#id').val();
  const titulo = $(this).find('#titulo').val();
  const autor = $(this).find('#autor').val();
  const contenido = $(this).find('textarea').val();

  $.ajax({
    url: `/blog-api/actualizar-comentario/${id}`,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({id, titulo, autor, contenido}),
    success: response => {
      location.reload();
    },
    error: ({status, statusText}) => {
      alert(`Status code ${status}\n${statusText}`);
    }
  });
});

$('#deleteComment').on('submit', function(e) {
  e.preventDefault();
  const id = $(this).find('#id').val();

  $.ajax({
    url: `/blog-api/remover-comentario/${id}`,
    method: 'DELETE',
    contentType: 'application/json',
    data: JSON.stringify({id}),
    success: response => {
      location.reload();
    },
    error: ({status, statusText}) => {
      alert(`Status code ${status}\n${statusText}`);
    }
  });
});

$('#searchComment').on('submit', function(e) {
  e.preventDefault();
  const autor = $(this).find('#autor').val();

  $.ajax({
    url: `/blog-api/comentarios-por-autor?autor=${autor}`,
    method: 'GET',
    dataType: 'json',
    success: response => {
      $('#autorCommentsList').empty();
      response.forEach(comment => {
        const {id, titulo, contenido, autor, date} = comment;
        $('#autorCommentsList').append(`
          <li>
            <h4>${titulo}</h4>
            <p class="commentContent">${contenido}</p>
            <p>By: ${autor}</p>
            <p>ID: ${id}</p>
            <p>Date: ${date}</p>
          </li>
        `);
      });
    },
    error: ({status, statusText}) => {
      alert(`Status code ${status}\n${statusText}`);
    }
  });
});

init();