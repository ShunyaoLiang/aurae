document.addEventListener('DOMContentLoaded', () => {
  // Check if the user has recorded their mood.
  // TODO.

  const mood_prompt = document.getElementById('mood-prompt');
  mood_prompt.hidden = false;
});

function thing(number) { 
  const mood_prompt = document.getElementById('mood-prompt');
  mood_prompt.hidden = true;
  const main = document.getElementsByTagName('main')[0];
  main.hidden = false;
}
