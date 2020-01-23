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
  const titulo = $(this).find('#titulo').val();
  const autor = $(this).find('#autor').val();
  const contenido = $(this).find('textarea').val();

  $.ajax({
    url: '/blog-api/nuevo-comentario',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({titulo, autor, contenido}),
    success: response => {
      console.log('Yei', response);
    },
    error: ({status, statusText}) => {
      alert(`Status code ${status}\n${statusText}`);
    }
  });
});

init();