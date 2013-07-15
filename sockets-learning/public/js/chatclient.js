var socket = io.connect('http://localhost');
socket.on('newMessage', function (data) {
    if (!data){
        id = data['id'];
        name = data['name'];
        message = data['message'];
    }

    if (id != $('#id').val()) { return; }
    $('#discussion').append('<li tabindex="1"><strong>' + htmlEncode(name)
        + '</strong>: ' + htmlEncode(message) + '</li>');
    $('#discussion').scrollTop($('#discussion li:nth-child(' + $('#discussion')[0].children.length + ')').position().top);
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

var statusCheck = setInterval(function () { $('#status').text("Disconnected"); }, 15000);
$('#sendmessage').click(sendMessage);

function sendMessage() {
    chat.server.send($('#id').val(), $('#displayname').val(), $('#message').val());
    $('#message').val('').focus();
}

$(function () {
    $('#status').text("Connected");
});

//$(function () {
//    var chat = $.connection.chatHub;
//    chat.client.uniqueId = "12345";
//
//    chat.client.addNewMessageToPage = function (id, name, message) {
//        if (id != $('#id').val()) { return; }
//        $('#discussion').append('<li tabindex="1"><strong>' + htmlEncode(name)
//            + '</strong>: ' + htmlEncode(message) + '</li>');
//        $('#discussion').scrollTop($('#discussion li:nth-child(' + $('#discussion')[0].children.length + ')').position().top);
//    };
//
//    chat.client.addChatter = function (id, names) {
//        if (id != $('#id').val()) { return; }
//        $('#present').empty();
//        names.forEach(function(name) {
//            if ($('#displayname').val() == name) {
//                $('#present').append('<li><strong>' + htmlEncode(name) + '</strong></li>');
//            } else {
//                $('#present').append('<li>' + htmlEncode(name) + '</li>');
//            }
//
//        });
//    };
//
//    chat.client.refreshAttendees = function() {
//        chat.server.getAttendees($('#id').val());
//    };
//
//    chat.client.updateStatus = function (id, names) {
//        chat.server.updateLastSeen($('#id').val(), $('#displayname').val());
//        clearInterval(statusCheck);
//        statusCheck = setInterval(function () {
//            $('#status').text("Disconnected");
//            $('#status').addClass('badge-warning').removeClass('badge-success');
//        }, 15000);
//        $('#status').text("Connected");
//        $('#status').addClass('badge-success').removeClass('badge-warning');
//    };
//
//    $('#displayname').val(prompt('Enter your name:', ''));
//    $('#message').focus();
//
//    $.connection.hub.start().done(function () {
//        chat.server.connect($('#id').val(), $('#displayname').val());
//        $('#sendmessage').click(sendMessage);
//        $('#message').keydown(function (e) {
//            if (e.which == 13 && !e.shiftKey) {
//                $('#sendmessage').trigger('click');
//                return false;
//            }
//        });
//    });
//
//    function sendMessage() {
//        chat.server.send($('#id').val(), $('#displayname').val(), $('#message').val());
//        $('#message').val('').focus();
//    }
//
//    ;
//});

function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}