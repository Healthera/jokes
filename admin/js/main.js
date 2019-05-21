/* Jokes Administration Web Javascript */
var jokeController = {
    data: [],
    token: '',
    setAuthHeader: function(xhr){
        xhr.setRequestHeader('Authorization', 'Bearer ' + jokeController.token);
    },
    allowedFilters: function(filters) {
        if (!filters) {
            return '';
        }
        return "text=" + (filters.text || '') + '&category=' + (filters.category || '');
    },
    loadData: function(filter) {
        console.log('loadData: filters', filter);
        var asyncData = $.Deferred();
        $.ajax({
            type: "GET",
            url: "/all",
            data: jokeController.allowedFilters(filter),
            beforeSend: jokeController.setAuthHeader
        }).done(function(data){
            console.log('loadData: jokes', data.jokes);
            jokeController.data = data.jokes;
            asyncData.resolve(jokeController.data);
        });
        return asyncData.promise();
    },

    insertItem: function(item) {
        return $.ajax({
            type: "POST",
            url: "/",
            contentType: "application/json",
            data: JSON.stringify(item),
            beforeSend: jokeController.setAuthHeader
        });
    },

    updateItem: function(item) {
        return $.ajax({
            type: "POST",
            url: "/",
            contentType: "application/json",
            data: JSON.stringify(item),
            beforeSend: jokeController.setAuthHeader
        });
    },

    deleteItem: function(item) {
        return $.ajax({
            type: "DELETE",
            url: "/"+item.id,
            beforeSend: jokeController.setAuthHeader
        });
    }
};

function initGrid() {
    var myGrid = $("#jsGrid").jsGrid({
        width: "100%",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        filtering: true,

        controller: jokeController,

        fields: [
            { name: "id", title: "Id", type: "text", width: 50, readOnly: true, css: "readOnly", headercss: "readOnly" },
            { name: "creationDate", title: "Created", type: "text", width: 50, readOnly: true, css: "readOnly", headercss: "readOnly" },
            { name: "text", title: "Joke", type: "text", width: 200, validate: "required" },
            { name: "category", title: "Category", type: "text", width: 50 },
            { type: "control" }
        ]
    });

    myGrid.jsGrid('loadData');
}

$('form[name=login]').on('submit', function login(e){
    e.preventDefault();
    var formData = new FormData(this);
    var usr = formData.get('username'),
        psw = formData.get('password');

    $.ajax({
        type: "POST",
        url: "/signup",
        contentType: "application/json",
        data: JSON.stringify({usr: usr, psw: psw} )
    }).done(function(data){
        console.log('authentication', data);
        if (data.token) {
            jokeController.token = data.token;
            $('#loginContainer').hide('slow');
            $('#errorMessage').text(''); //reset error message, in case of reuse
            initGrid(); //load and display jokes
        } else {
            $('#errorMessage').text('Failed to authenticate');
        }
    });
});