function urlInputIsNotEmpty() {
  return $('#url-input').val() !== '';
}

function onClickShortenBtn() {
  $('#shorten-success-alert').hide();
  if (urlInputIsNotEmpty()) {
    $.post(
      '/api/shorten',
      {
        url: $('#url-input').val(),
      },
      (res, status) => {
        if (status === 'success') {
          $('#ret-url').val(res.url);
          $('#shorten-success-alert').show();
        }
      },
    );
  }
}

$(document).ready(() => {
  new Clipboard('#copy-btn');
  $('#shorten-btn').click(onClickShortenBtn);
});
