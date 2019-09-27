const apiKey = 'rgvJLasCOvA7NKDPEm1xLldi8q7ktUqo1c2nohmR';
const baseURL = 'https://developer.nps.gov/api/v1/parks';



function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

//display results to the DOM
function displayResults(JsonResponse){

  console.log(JsonResponse);
  
  $('#results-list').empty();

  for (let i = 0; i < JsonResponse.data.length; i++){
    $('#results-list').append(
      `<li>
          <h3>${JsonResponse.data[i].fullName}</h3>
          <p>${JsonResponse.data[i].description}</p>
          <a href="${JsonResponse.data[i].url}">${JsonResponse.data[i].url}</a>
       </li>`
    );
    console.log(JsonResponse.data[i].fullName);
  }

  $('#results').removeClass('hidden');

}


//get park results from nps services
function getParkResults(state, maxResults=10){
  const params = {
    api_key: apiKey,
    stateCode: state,
    limit: maxResults,
  };
  
  const queryString = formatQueryParams(params);
  const url = baseURL + '?' + queryString;
  

  fetch(url)
    .then(response => {
      if (response.ok){
        return response.json();
      } throw new Error(response.statusText);
    })
    .then(JsonResponse => {
      return displayResults(JsonResponse);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

//event listener submit form
function handleClickSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    const maxResults = $('#js-max-results').val();
    const states = $('#state').val();
    getParkResults(states, maxResults);
  }); 
}


$(handleClickSubmit);