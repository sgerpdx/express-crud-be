const form = document.getElementById('fact-share');
const ul = document.getElementById('facts');

form.addEventListener('Submit', (e) => {
  e.preventDefault();

  const fd = new FormData(form);

  fetch('/api/v1/facts', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: fd.get(),
  }).then((res) => console.log(res));

  fetch('/api/v1/facts', {
    method: 'GET',
  }).then((facts) => {
    facts.forEach((fact) => {
      const li = document.createElement('li');
      li.textContent = fact;
      ul.appendChild(li);
    });
  });
});
