'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const $ok = document.getElementById('ok');
  const $message = document.getElementById('message');
  const $messages = document.getElementById('messages');

  // $ok.onclick = (e) => {
  $ok.addEventListener('click', (e) => {
    const message = $message.value
    // xss になりかねない
    const $li = document.createElement('li')

    $li.textContent = message
    console.log($li);

    $messages.appendChild($li)
  })

  console.log($ok)

  ['a', 'b', 'c', 'd']

})
