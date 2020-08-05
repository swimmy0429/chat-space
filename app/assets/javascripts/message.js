$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__message-list__item">
          <ui class="chat-main__message-list__item__member">
            ${message.user_name}
            <li class="chat-main__message-list__item__member__time">
              ${message.created_at}
            </li>
          </ui>
        </div>
        <div class="chat-main__message-list__message">
            <p class="chat-main__message-list__message__content">
              ${message.content}
            </p>
            <img class="chat-main__message-list__message__image" src = "${message.image}">
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message-list__item">
        <ui class="chat-main__message-list__item__member">
          ${message.user_name}
          <li class="chat-main__message-list__item__member__time">
            ${message.created_at}
          </li>
        </ui>
      </div>
      <div class="chat-main__message-list__message">
          <p class="chat-main__message-list__message__content">
            ${message.content}
          </p>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html); 
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});
