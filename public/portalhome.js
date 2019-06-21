document.addEventListener('DOMContentLoaded',function(){
    //Tap for Joke Button: - shows joke
    document.getElementById('show-joke-btn').onclick=function(){
      let req=new XMLHttpRequest();
      req.open("GET",'/random-joke',true);
      req.send();
      req.onload=function(){
        let jsondata=JSON.parse(req.responseText);
        document.getElementsByClassName('show-joke')[0].innerHTML=JSON.stringify(jsondata.joke);
      };
    }

    //Submit New Joke: - calls create-joke api
    document.getElementById('submit-joke-btn').onclick=function(){
        let req=new XMLHttpRequest();
        //get value from new joke text field:
        let newJokeValue = document.getElementById('new-joke-text').value;
        let newKeywordValue = document.getElementById('new-joke-keyword').value;
        //console.log('jokeval: ' + newJokeValue);
        //console.log('keywordval: ' + newKeywordValue);
        let url = encodeURI('/create-joke?newjoke=' + newJokeValue + '&tags=' + newKeywordValue);
        req.open("POST",url,true);
        req.send();
        req.onload=function(){
            console.log(req.responseText.message);
            let jsondata=JSON.parse(req.responseText);
            document.getElementById('add-joke-message').innerHTML=jsondata.message;
            if(jsondata.success){
                document.getElementById('add-joke-message').classList.remove("message-warning");
                document.getElementById('add-joke-message').classList.add("message-success");
                //if successful clear fields:
                document.getElementById('new-joke-text').value='';
                document.getElementById('new-joke-keyword').value='';
            } else{
                document.getElementById('add-joke-message').classList.remove("message-success");
                document.getElementById('add-joke-message').classList.add("message-warning");
            }
        };
    };

    //View Joke List: - shows list of jokes table - calls read api
    document.getElementById('list-joke-btn').onclick=function(){
        ReadJokeList();
    }

    function ReadJokeList(){
        let req=new XMLHttpRequest();
        req.open("GET",'/read-joke',true);
        req.send();
        req.onload=function(){
            let container = document.getElementsByClassName('list-joke-data')[0];
            let jsondata=JSON.parse(req.responseText);
            let html = '';
            for(let i=0; i< jsondata.length; i++){
                html+= '<tr>';
                html+= '<td>' + jsondata[i]['joke'] + '</td>';
                html+= '<td>' + jsondata[i]['keywords'] + '</td>';
                html+= '<td><button class="btn btn-sm btn-warning update-joke-btn" data-value="' + jsondata[i]['id']  + '" data-joke="' + jsondata[i]['joke'] + '" data-keywords="' + jsondata[i]['keywords'] + '"> Update </button></td>';
                html+= '<td><button class="btn btn-sm btn-danger delete-joke-btn" data-value="' + jsondata[i]['id']  + '"> X </button></td>';
                html+= '</tr>';
            }
            container.innerHTML=html;
            BindDeleteButtons();
            BindUpdateButtons();
        }
    }

    // //Update Joke: - calls update-joke api
    function BindUpdateButtons(){
        let elements = document.getElementsByClassName('update-joke-btn');
        for(let i = 0; i < elements.length; i++){
            elements[i].addEventListener("click", function(event){
                let currentJoke = event.currentTarget.getAttribute("data-joke");
                let currentKeywords = event.currentTarget.getAttribute("data-keywords");
                let currentID = event.currentTarget.getAttribute("data-value");
                // Show update joke form, populated with joke and keywords:
                $('#update-joke-form').show();
                document.getElementById('current-joke-text').value=currentJoke;
                document.getElementById('current-joke-keyword').value=currentKeywords;
                document.getElementById('current-joke-id').setAttribute("data-current-id", currentID);
            })
        }
    }

    document.getElementById('submit-update-btn').onclick=function(){
        let req=new XMLHttpRequest();
        let updateJokeValue = document.getElementById('current-joke-text').value;
        let updateKeywordsValue = document.getElementById('current-joke-keyword').value;
        let updateJokeId = document.getElementById('current-joke-id').getAttribute("data-current-id");
        let url = encodeURI('/update-joke?update_id=' + updateJokeId + '&update_joke=' + updateJokeValue + '&update_tags=' + updateKeywordsValue);
        req.open("PUT",url,true);
        req.send();
        req.onload=function(){
            let jsondata=JSON.parse(req.responseText);
            document.getElementById('update-joke-message').innerHTML=jsondata.message;
            if(jsondata.success){
                document.getElementById('update-joke-message').classList.remove("message-warning");
                document.getElementById('update-joke-message').classList.add("message-success");
                $('#update-joke-form').hide();
                //repopulate table:
                document.getElementsByClassName('list-joke-data')[0].innerHTML='';
                ReadJokeList();
            } else{
                document.getElementById('update-joke-message').classList.remove("message-success");
                document.getElementById('update-joke-message').classList.add("message-warning");
            }
        };
    }

    

    //Delete Joke: - calls delete-joke api
    function BindDeleteButtons(){
        let elements = document.getElementsByClassName('delete-joke-btn');
        for(let i = 0; i< elements.length; i++){
            elements[i].addEventListener("click",function(event){
                console.log(event);
                let req=new XMLHttpRequest();
                let url = encodeURI('/delete-joke?joke_id=' + event.currentTarget.getAttribute("data-value"));
                req.open("DELETE",url,true);
                req.send();
                req.onload=function(){
                    console.log(req.responseText.message);
                    let jsondata=JSON.parse(req.responseText);
                    document.getElementById('delete-joke-message').innerHTML=jsondata.message;
                    if(jsondata.success){
                        document.getElementById('delete-joke-message').classList.remove("message-warning");
                        document.getElementById('delete-joke-message').classList.add("message-success");
                        //reset table display:
                        document.getElementsByClassName('list-joke-data')[0].innerHTML='';
                        ReadJokeList();
        
                    } else{
                        document.getElementById('delete-joke-message').classList.remove("message-success");
                        document.getElementById('delete-joke-message').classList.add("message-warning");
                    }
                };
            });
        }
    }


});

  //Set up portal display functionality --> using jQuery for speed
  //Need to convert to javascript as required
  $(document).ready(() => {
    //Set up page - hide all sections
    $('.show-joke').hide();
    $('.add-joke').hide();
    $('.list-joke').hide();

    //Tap for Joke: - combine this with javascript (don't have two calls on same button)
    $('#show-joke-btn').on('click', () => {
        $('.show-joke').show();
        $('.add-joke').hide();
        $('.list-joke').hide();
    });
    //Add new joke
    $('#add-joke-btn').on('click', () => {
        $('.show-joke').hide();
        $('.add-joke').show();
        $('.list-joke').hide();
        $('#add-joke-message').html('').removeClass('message-success').removeClass('message-warning');
    });
    //list jokes
    $('#list-joke-btn').on('click', () => {
        $('.show-joke').hide();
        $('.add-joke').hide();
        $('.list-joke').show();
        $('#update-joke-form').hide()
        $('#update-joke-message').html('').removeClass('message-success').removeClass('message-warning');
        $('#delete-joke-message').html('').removeClass('message-success').removeClass('message-warning');
    });

  });

