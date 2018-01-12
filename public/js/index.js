$(document).ready(() => {
  $('#submit-url-btn').click(() => {
    $.post(
      '/api/shorten',
      {
        url: $('#url-input').val(),
      },
      (res, status) => {
        console.log(status);
        console.log(res);
      },
    );
  });
});
