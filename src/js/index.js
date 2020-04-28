const ipcRenderer = require('electron').ipcRenderer
const shell = require('electron').shell
const notification = document.getElementById('notification');
const message = document.getElementById('message');
global.jQuery = require('jquery');
global.$ = jQuery.noConflict();
require('popper.js')
const moment = require('moment')
var stripe
var elements
var style
var card
var displayError
var form
$(document).ready(() => {
    ipcRenderer.send('page-ready');

    moment().format();
    if (document.title === "Login"||document.title === "Forgot Password"||document.title === "Verification" ||document.title === "Request Access"){
    } else{
      $.getScript("https://js.stripe.com/v3/", function() {
        // Set your publishable key: remember to change this to your live publishable key in production
        // See your keys here: https://dashboard.stripe.com/account/apikeys
        stripe = Stripe('pk_test_bMjXjvxyeBQG8go4YsJMBjnN008OgLZmNZ');
        elements = stripe.elements();

        // Set up Stripe.js and Elements to use in checkout form
        style = {
          base: {
            color: "#32325d",
          }
        };

        card = elements.create("card", { style: style });
        card.mount("#card-element");

        // Add error checking
        displayError = document.getElementById('card-errors');
        card.addEventListener('change', function(event) {
          if (event.error) {
            displayError.textContent = event.error.message;
          } else {
            displayError.textContent = '';
          }
        });
        form = document.getElementById("payment-form");
        form.addEventListener('submit', handleForm);
      })
    }

    $.getScript("./js/tempusdominus-bootstrap-4.min.js", function() {
     
      $(function () {
        $('#datetimepicker1').datetimepicker({
          format: 'DD/MM/YYYY HH:mm'
        });
      });
      
      $(function () {
      $('#datetimepicker2').datetimepicker({
        format: 'DD/MM/YYYY HH:mm'
        });
      });

      $(function () {
        $('#datetimepicker3').datetimepicker({
          format: 'DD/MM/YYYY HH:mm'
        });
      });
      $(function () {
          $('#datetimepicker4').datetimepicker({
            format: 'DD/MM/YYYY HH:mm'
        });
      });
      $(function () {
        $('#datetimepicker5').datetimepicker({
          format: 'DD/MM/YYYY HH:mm'
      });
    });
      
    })
    require("bootstrap")
});

ipcRenderer.on('message', (event, arg) => {
  if (arg == "An update was downloaded it will be installed on exit. Please wait 1-2 minutes before reopening."){
    document.getElementById("restart-button").classList.remove('hidden');
  }
  message.innerText = arg;
  notification.classList.remove('hidden');
});

function closeNotification() {
  notification.classList.add('hidden');
}

function restartApp() {
  ipcRenderer.send('restart_app');
}

function Nav() {
  if (document.getElementById("mySidenav").style.width === "0px" || document.getElementById("mySidenav").style.width == "") {
    document.getElementById("mySidenav").style.width = "250px";
    $('.animated-icon').addClass('open');
    $("#tint").removeClass("tinthidden");
    $("#tint").addClass("tintvisible")
  }else {
    document.getElementById("mySidenav").style.width = "0px";
    $('.animated-icon').removeClass('open');
    $("#tint").addClass("tinthidden");
    $("#tint").removeClass("tintvisible")
    $("#members .fa-chevron-right").removeClass("rtoate90");
    $("#dropdown1").stop().slideUp(300);
    $("#events .fa-chevron-right").removeClass("rtoate90");
    $("#dropdown2").stop().slideUp(300);
    $("#payments .fa-chevron-right").removeClass("rtoate90");
    $("#dropdown3").stop().slideUp(300);
  }
};
function Logout() {
    ipcRenderer.send('logout');
};
function tint() {
  document.getElementById("mySidenav").style.width = "0px";
  $('.animated-icon').removeClass('open');
  $("#tint").addClass("tinthidden");
  $("#tint").removeClass("tintvisible");
  $("#members .fa-chevron-right").removeClass("rtoate90");
  $("#dropdown1").stop().slideUp(300);
  $("#events .fa-chevron-right").removeClass("rtoate90");
  $("#dropdown2").stop().slideUp(300);
  $("#payments .fa-chevron-right").removeClass("rtoate90");
  $("#dropdown3").stop().slideUp(300);
  //make it so it changes display to none
 };
 var adminCheck
 ipcRenderer.on('admin-check', (event, arg) => {
  if (document.title === "Login"||document.title === "Forgot Password"||document.title === "Verification" ||document.title === "Request Access"){
  }
  if(arg == false){
    document.getElementById("members").style.display = "none";
    document.getElementById("accounting").style.display = "none";
    document.getElementById("approved-selection").style.display = "none"
    adminCheck = false
  } else {
    adminCheck = true
  }
  if(document.title === "Events"){
    ipcRenderer.send('events-ready');
  }
  if(document.title === "Members"){
    ipcRenderer.send('members-ready');
  }
  if(document.title === "Main"){
    ipcRenderer.send('main-ready');
  }
  if(document.title === "Messaging"){
    ipcRenderer.send('messages-ready');
  }
  if(document.title === "Payments"){
    ipcRenderer.send("payments-ready")
  }
  if(document.title === "Accounting"){
    ipcRenderer.send("accounting-ready")
  }
 })

// Events.js:

var loadedData
ipcRenderer.on('event-data', (event, arg) => {
    loadedData = JSON.parse(arg)
    loadedData = loadedData.sort(function(a, b) { return new Date(a.datetime) - new Date(b.datetime) })  //remove this line and change it to quicksort to get marks for recursion but in reality id just use this
    var i=0
    var table =''; //to store html table
    if (adminCheck == true){
      for(i; i<loadedData.length; i++){
        if(loadedData[i].accepted == 1){
          var accepted = "Yes"
          var acceptedquotes = "'Yes'"
        }else{
          var accepted = "No"
          var acceptedquotes = "'No'"
        }
        var id = "'" + loadedData[i].ID + "'"
        var title = "'" + loadedData[i].title + "'"
        var description = "'" + loadedData[i].description + "'"
        var datetime = "'" + moment(loadedData[i].datetime).format("DD/MM/YYYY HH:mm") + "'"
        var location = "'" + loadedData[i].location + "'"
        table +='<tr><td class="mytd" style="vertical-align: middle;" scope="row">'+ loadedData[i].title +'</td><td class="mytd" style="vertical-align: middle;">'+ loadedData[i].description +'</td><td class="mytd" style="vertical-align: middle;">'+moment(loadedData[i].datetime).format("DD/MM/YYYY HH:mm")+'</td><td class="mytd" style="vertical-align: middle;">'+loadedData[i].location+'</td><td class="mytd" style="vertical-align: middle;">'+loadedData[i].submitted_by+'</td><td class="mytd" style="vertical-align: middle;">'+accepted+'</td><td class="mytd"><button type="button" class="btn btn-info" style="margin-right: 10px;" onclick="editEvent('+ acceptedquotes +','+ title +','+ description +','+ datetime +','+ location +','+ id +')" >&#9998; Edit</button><button type="submit" style="margin-right: 10px;" class="btn btn-danger" onclick="deleteEventFunc(' + id + ','+title+')">&#9888; Delete</button></td></tr>';
      }
      table ='<table class="table table-striped mytable"><thead><tr><th>Title</th><th>Description</th><th>Date and Time</th><th>Location</th><th>Submitted By</th><th>Approved</th><th>Options</th></tr></thead><tbody>'+ table +'</tbody></table>';
      document.getElementById("table").innerHTML = table
      document.getElementById("SearchBox").style.display = "flex"
      document.getElementById("totalEvents").innerHTML = "Total events: " + loadedData.length
      document.getElementById("addEvent").style.display = ""
    } else {
      document.getElementById("approved-selection").style.display = "none"
      loadedData = loadedData.filter(data => data.accepted > 0);
      for(i; i<loadedData.length; i++){
        table +='<tr><td class="mytd" style="vertical-align: middle;" scope="row">'+ loadedData[i].title +'</td><td class="mytd" style="vertical-align: middle;">'+ loadedData[i].description +'</td><td class="mytd" style="vertical-align: middle;">'+moment(loadedData[i].datetime).format("DD/MM/YYYY HH:mm")+'</td><td class="mytd" style="vertical-align: middle;">'+loadedData[i].location+'</td></tr>';
      }
      table ='<table class="table table-striped mytable"><thead><tr><th>Title</th><th>Description</th><th>Date and Time</th><th>Location</th></tr></thead><tbody>'+ table +'</tbody></table>';
      document.getElementById("table").innerHTML = table
      document.getElementById("SearchBox").style.display = "flex"
      document.getElementById("totalEvents").innerHTML = "Total events: " + loadedData.length
      document.getElementById("addEvent").style.display = ""
    }
  })
  function editEvent(acceptedquotes, title, description, datetime, location, id){
    $('#editEventModal').modal('toggle');
    document.getElementById("titleEdit").value = title
    document.getElementById("descriptionEdit").value = description
    document.getElementById("datetimeEdit").value = datetime
    document.getElementById("locationEdit").value = location
    document.getElementById("approvedEdit").value = acceptedquotes
    document.getElementById("eventID").value = id
  }
  var deleteEventID
  function deleteEventFunc(ID,Title){
    deleteEventID = ID
    $('#deleteEventModal').modal('toggle');
    document.getElementById("deleteevent").innerHTML = Title
    document.getElementById("confirmPassword").value = null
    document.getElementById("confirmPassword").focus()
  }

  function deleteEventConfirm(){
    var details = {
      ID: deleteEventID,
      password: document.getElementById('confirmPassword').value
  }
    ipcRenderer.send("delete-event", details)
  }

  ipcRenderer.on("event-delete-incorrect", (event,arg) =>{
    document.getElementById('confirmPassword').value = null
    document.getElementById('confirmPassword').focus()
  })

function editEventConfirm() {
  if (document.getElementById("approvedEdit").value == "Yes"){
    var acceptedEdit = "1"
  }else{
    var acceptedEdit = "0"
  }
  var details = {
    title: document.getElementById("titleEdit").value,
    description: document.getElementById("descriptionEdit").value,
    datetime: moment(document.getElementById("datetimeEdit").value,"DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
    location: document.getElementById("locationEdit").value,
    id: document.getElementById("eventID").value,
    accepted: acceptedEdit
}
  ipcRenderer.send('edit-event', details);
}

if(document.title === "Events"){
document.getElementById("SearchBoxInput").onkeyup = function(){
  var searchTerm = document.getElementById("SearchBoxInput").value
  if (searchTerm == "") {
    var arg = loadedData
  } else {
    var arg = loadedData.filter(item => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  }
  var i=0
  var table =''; //to store html table
  if (adminCheck == true){
  for(i; i<arg.length; i++){
    if(arg[i].accepted == 1){
      var accepted = "Yes"
      var acceptedquotes = "'Yes'"
    }else{
      var accepted = "No"
      var acceptedquotes = "'No'"
    }
    var id = "'" + arg[i].ID + "'"
    var title = "'" + arg[i].title + "'"
    var description = "'" + arg[i].description + "'"
    var datetime = "'" + moment(arg[i].datetime).format("DD/MM/YYYY HH:mm") + "'"
    var location = "'" + arg[i].location + "'"
    table +='<tr><td class="mytd" style="vertical-align: middle;" scope="row">'+ arg[i].title +'</td><td class="mytd" style="vertical-align: middle;">'+ arg[i].description +'</td><td class="mytd" style="vertical-align: middle;">'+moment(arg[i].datetime).format("DD/MM/YYYY HH:mm")+'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].location+'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].submitted_by+'</td><td class="mytd" style="vertical-align: middle;">'+accepted+'</td><td class="mytd"><button type="button" class="btn btn-info" style="margin-right: 10px;" onclick="editEvent('+ acceptedquotes +','+ title +','+ description +','+ datetime +','+ location +','+ id +')" >&#9998; Edit</button><button type="submit" style="margin-right: 10px;" class="btn btn-danger" onclick="deleteEventFunc(' + id + ','+title+')">&#9888; Delete</button></td></tr>';
  }
  table ='<table class="table table-striped mytable"><thead><tr><th>Title</th><th>Description</th><th>Date and Time</th><th>Location</th><th>Submitted By</th><th>Approved</th><th>Options</th></tr></thead><tbody>'+ table +'</tbody></table>';
  document.getElementById("table").innerHTML = table
  document.getElementById("totalEvents").innerHTML = "Total events: " + arg.length
  } else {
    arg = arg.filter(data => data.accepted > 0);
    for(i; i<arg.length; i++){
      table +='<tr><td class="mytd" style="vertical-align: middle;" scope="row">'+ arg[i].title +'</td><td class="mytd" style="vertical-align: middle;">'+ arg[i].description +'</td><td class="mytd" style="vertical-align: middle;">'+moment(arg[i].datetime).format("DD/MM/YYYY HH:mm")+'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].location+'</td></tr>';
    }
    table ='<table class="table table-striped mytable"><thead><tr><th>Title</th><th>Description</th><th>Date and Time</th><th>Location</th></tr></thead><tbody>'+ table +'</tbody></table>';
    document.getElementById("table").innerHTML = table
    document.getElementById("totalEvents").innerHTML = "Total events: " + arg.length
  }
};
}

$("#events").click(function(){
  $("#events .fa-chevron-right").toggleClass("rtoate90");
  $("#dropdown2").stop().slideToggle(300);
});

 function addEvent() {
  tint()
  document.getElementById("titleInput").value = ""
  document.getElementById("descriptionInput").value = ""
  document.getElementById("datetimeInput").value = ""
  document.getElementById("locationInput").value = ""
}
function eventAdd() {
  var details = {
    title: document.getElementById("titleInput").value,
    description: document.getElementById("descriptionInput").value,
    datetime: moment(document.getElementById("datetimeInput").value,"DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
    location: document.getElementById("locationInput").value,
    approved: document.getElementById("approvedInput").value
}
ipcRenderer.send('add-event', details);
}

// Members.js:

var loadedData
ipcRenderer.on('member-data', (event, arg) => {
  loadedData = JSON.parse(arg)
  var i=0
  var table =''; //to store html table
  for(i; i<loadedData.length; i++){
    if(loadedData[i].Privileges == 1){
      var usertype = "Admin"
      var usertypequotes = "'Admin'"
    }else{
      var usertype = "Standard"
      var usertypequotes = "'Standard'"
    }
    var username = "'" + loadedData[i].username + "'"
    var email = "'" + loadedData[i].email + "'"
    table +='<tr><td class="mytd" style="vertical-align: middle;" scope="row">'+ loadedData[i].username +'</td><td class="mytd" style="vertical-align: middle;">'+ usertype +'</td><td class="mytd" style="vertical-align: middle;">'+loadedData[i].email+'</td><td class="mytd"><button type="button" class="btn btn-info" style="margin-right: 10px;" onclick="editMemberFunc('+ usertypequotes +','+ username +','+ email +')" >&#9998; Edit</button><button type="submit" style="margin-right: 10px;" class="btn btn-danger" onclick="deleteUser(' + username + ')">&#9888; Delete</button></td></tr>';
  }
  table ='<table class="table table-striped mytable"><thead><tr><th>Username</th><th>Account type</th><th>Email</th><th>Options</th></tr></thead><tbody>'+ table +'</tbody></table>';
  document.getElementById("table").innerHTML = table
  document.getElementById("totalMembers").innerHTML = "Total members: " + loadedData.length
  document.getElementById("SearchBox").style.display = "flex" 
  document.getElementById("addMember").style.display = "" 
})


function editMemberFunc(usertype, username, email){
  ipcRenderer.send("edit-self?", username)
  ipcRenderer.on("edit-self-result", (event, arg) => {
    $('#editMemberModal').modal('toggle');
    document.getElementById("userTypeEdit").value = usertype
    document.getElementById("usernameEdit").value = username
    document.getElementById("emailEdit").value = email
  })
}
function editUserConfirm(){
  if (document.getElementById("userTypeEdit").value == "Admin"){
    var editusertype = "1"
  }else{
    var editusertype = "0"
  }
  var details = {
    username: document.getElementById("usernameEdit").value,
    email: document.getElementById("emailEdit").value,
    userType: editusertype
}
  ipcRenderer.send('edit-user', details);
}

function deleteUser(arg){
  ipcRenderer.send('delete-self?', arg);
}

ipcRenderer.on("delete-user-result", (event,username) =>{
    $('#deleteMemberModal').modal('toggle');
    document.getElementById("deleteusername").innerHTML = username
    document.getElementById("confirmPassword").value = null
    document.getElementById("confirmPassword").focus()
})

function deleteUserConfirm(){
  var details = {
    username: document.getElementById('deleteusername').innerHTML,
    password: document.getElementById('confirmPassword').value
}
  ipcRenderer.send("delete-user", details)
}

ipcRenderer.on("member-delete-incorrect", (event,arg) =>{
  document.getElementById('confirmPassword').value = null
  document.getElementById('confirmPassword').focus()
})

if(document.title === "Members"){
document.getElementById("SearchBoxInput").onkeyup = function(){
  var searchTerm = document.getElementById("SearchBoxInput").value
  if (searchTerm == "") {
    var arg = loadedData
  } else {
    var arg = loadedData.filter(item => item.username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  }
  var i=0
  var table =''; //to store html table
  for(i; i<arg.length; i++){
    if(arg[i].Privileges == 1){
      var usertype = "Admin"
      var usertypequotes = "'Admin'"
    }else{
      var usertype = "Standard"
      var usertypequotes = "'Standard'"
    }
    var username = "'" + arg[i].username + "'"
    var email = "'" + arg[i].email + "'"
    table +='<tr><td class="mytd" style="vertical-align: middle;" scope="row">'+ arg[i].username +'</td><td class="mytd" style="vertical-align: middle;">'+ usertype +'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].email+'</td><td class="mytd"><button type="button" class="btn btn-info" style="margin-right: 10px;" onclick="editMemberFunc('+ usertypequotes +','+ username +','+ email +')" >&#9998; Edit</button><button type="submit" style="margin-right: 10px;" class="btn btn-danger" onclick="deleteUser(' + username + ')">&#9888; Delete</button></td></tr>';
  }
  table ='<table class="table table-striped mytable"><thead><tr><th>Username</th><th>Account type</th><th>Email</th><th>Options</th></tr></thead><tbody>'+ table +'</tbody></table>';
  document.getElementById("table").innerHTML = table
  document.getElementById("totalMembers").innerHTML = "Total members: " + arg.length
};
}

$("#members").click(function(){
  $("#members .fa-chevron-right").toggleClass("rtoate90");
  $("#dropdown1").stop().slideToggle(300);
});

function addMembers(){
  tint()
  var password = Math.random().toString(36).substr(2, 8)
  document.getElementById("password").placeholder = password;
  document.getElementById("usernameInput").value = ""
  document.getElementById("emailInput").value = ""
}
function memberAdd(){
    var details = {
      username: document.getElementById("usernameInput").value,
      email: document.getElementById("emailInput").value,
      userType: document.getElementById("userType").value,
      password: document.getElementById("password").placeholder
  }
  ipcRenderer.send('add-member', details);
}

// Login.js:
      
function login(){
  var loginData =  {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    rememberMe: document.getElementById("rememberMe").checked
  };
  ipcRenderer.send('login', loginData)
  // disable button
  $("#loginbutton").prop("disabled", true);
  // add spinner to button
  $("#loginbutton").html(
    `<span class="spinner-border spinner-border-sm" style="margin-right:5px" role="status" aria-hidden="true"></span>Loading...`
  );
}

ipcRenderer.on('incorrect', (event, arg) => {
  document.getElementById('password').value = ""
  // enable button
  $("#loginbutton").prop("disabled", false);
  // remove spinner to button
  $("#loginbutton").html(`Sign in`)
});

function passwordReset() {
  ipcRenderer.send('reset-password', document.getElementById('email').value)
  $("#passwordResetButton").attr("disabled", true);
}

ipcRenderer.on('account-not-found', (event, arg) => {
  $("#passwordResetButton").attr("disabled", false);
})

function verify() {
  ipcRenderer.send("verify", document.getElementById("code").value)
}

function passwordResetConfirm() {
  ipcRenderer.send("password-reset", {pass1: document.getElementById("password").value, pass2: document.getElementById("passwordConfirm").value})
}

function requestAccess(){
  ipcRenderer.send("request-access", document.getElementById("email").value)
}

// Main.js:

ipcRenderer.on("main-data", (event, arg) => {
  document.getElementById("loading").innerHTML = ""
  document.getElementById("totalMembers").innerHTML = "Total members: " + JSON.parse(arg).length
})

// Messages.js:

var messageID
var selecteduser
var out = document.getElementById("messages-div");
var checked
var messagesID
var resultlength
var scrollOnMessageLoad
var messageload

ipcRenderer.on("messages-users", (event, arg) => {
  var i=0
  var table =''; //to store html table
  for(i; i<arg.length; i++){
    var username = "'" + arg[i].username + "'"
    table +='<tr><td id="'+arg[i].username+'" class="mytd" style="vertical-align: middle;text-align:center;color: #43474A!important;font-size:17px;cursor:pointer;" scope="row" onclick="loadmessages('+ username +')">'+ arg[i].username +'</td></tr>';
  }
  table ='<table class="table table-striped mytable"><tbody>'+ table +'</tbody></table>';
  document.getElementById("table").innerHTML = table
})

function loadmessages(username){
  if(selecteduser != null){
    document.getElementById(selecteduser).style.backgroundColor = ""
  }
  selecteduser = username
  checked = false
  messageID = 0
  resultlength = 0
  document.getElementById("messages").innerHTML = '<a class="abs-center-x" style="padding: 8px;font-size: 25px;color: #818181!important;"><span class="spinner-border m-1" style="width: 1.25rem;height: 1.25rem;border-width: .2rem;" role="status" aria-hidden="true"></span>Loading...</a>'
  document.getElementById(selecteduser).style.backgroundColor = "#AED3FF"
  document.getElementById("loadMore").style.display = "none"
  document.getElementById("jump").style.display = "none"
  ipcRenderer.send('messages-load', messageID, selecteduser, false, true);
}

function downloadfile(file){
  // strip off the data: url prefix to get just the base64-encoded bytes
  var data = file.replace("data:application/x-zip-compressed;base64,", "");
  var buf = new Buffer.from(data, 'base64');
  ipcRenderer.send("save-file",buf,extension)
}

var extension

ipcRenderer.on("messages-data", (event, arg, currentusername, messagesent, jump, clickedmessagefrom) => {
  if (clickedmessagefrom != null){
    selecteduser = clickedmessagefrom
    document.getElementById("messages").innerHTML = '<a class="abs-center-x" style="padding: 8px;font-size: 25px;color: #818181!important;"><span class="spinner-border m-1" style="width: 1.25rem;height: 1.25rem;border-width: .2rem;" role="status" aria-hidden="true"></span>Loading...</a>'
    document.getElementById(selecteduser).style.backgroundColor = "#AED3FF"
  }
  var i=0
  var table =''; //to store html table
  for(i; i<arg.length; i++){
    if (arg[i].messageFrom == currentusername){
      var read
      if(arg[i].messageRead == 0){read = "Unread"}else{read = "Read"}
      if(arg[i].file == 1){
        var strings = arg[i].message.split(",");
        switch (strings[0]) {//check file's extension
          case "data:image/jpeg;base64":
          case "data:image/png;base64":
          case "data:image/gif;base64":
          case "data:image/svg+xml;base64":
            table +='<tr><td class="mytd" style="background-color:#AED3FF;vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.5;min-height: 50px;padding: .75rem;" scope="row"><image style="max-width:100%;" src="'+ arg[i].message +'"></td><td  class="mytd" style="vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.15;width: 80px;text-align:center;" scope="row">'+read+'</td></tr>';
            break;
          case "data:application/x-zip-compressed;base64":
            var messageFile = "'" + arg[i].message + "'"
            table +='<tr><td class="mytd" onclick="downloadfile('+messageFile+')" style="background-color:#AED3FF;vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.5;min-height: 50px;padding: .75rem;cursor:pointer;" scope="row">Download File</td><td  class="mytd" style="vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.15;width: 80px;text-align:center;" scope="row">'+read+'</td></tr>';
            extension = "zip";
            break;
          default://should write cases for more types
            var messageFile = "'" + arg[i].message + "'"
            table +='<tr><td class="mytd" onclick="downloadfile('+messageFile+')" style="background-color:#AED3FF;vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.5;min-height: 50px;padding: .75rem;cursor:pointer;" scope="row">Unknown File - Download</td><td  class="mytd" style="vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.15;width: 80px;text-align:center;" scope="row">'+read+'</td></tr>';
            extension = null
            break;
        }
      } else{
        table +='<tr><td class="mytd" style="background-color:#AED3FF;vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.5;min-height: 50px;padding: .75rem;" scope="row">'+ arg[i].message +'</td><td  class="mytd" style="vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.15;width: 80px;text-align:center;" scope="row">'+read+'</td></tr>';
      }
    } else {
      if(arg[i].messageRead == 0){ipcRenderer.send('message-read', arg[i].ID);}
      if(arg[i].file == "1"){
        var strings = arg[i].message.split(",");
        switch (strings[0]) {//check file's extension
          case "data:image/jpeg;base64":
          case "data:image/png;base64":
          case "data:image/gif;base64":
          case "data:image/svg+xml;base64":
            table +='<tr><td class="mytd" style="background-color:lightgrey;vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.5;min-height: 50px;padding: .75rem;" scope="row"><image style="max-width:100%;" src="'+ arg[i].message +'"></td><td  class="mytd" style="vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.15;width: 80px;text-align:center;" scope="row"></td></tr>';
            break;
          case "data:application/x-zip-compressed;base64":
            var messageFile = "'" + arg[i].message + "'"
            table +='<tr><td class="mytd" onclick="downloadfile('+messageFile+')" style="background-color:lightgrey;vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.5;min-height: 50px;padding: .75rem;cursor:pointer;" scope="row">Download File</td><td  class="mytd" style="vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.15;width: 80px;text-align:center;" scope="row"></td></tr>';
            extension = "zip";
            break;
          default://should write cases for more types
            var messageFile = "'" + arg[i].message + "'"
            table +='<tr><td class="mytd" onclick="downloadfile('+messageFile+')" style="background-color:lightgrey;vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.5;min-height: 50px;padding: .75rem;cursor:pointer;" scope="row">Unknown File - Download</td><td  class="mytd" style="vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.15;width: 80px;text-align:center;" scope="row"></td></tr>';
            extension = null
            break;
        }
      } else {
        table +='<tr><td class="mytd" style="background-color:lightgrey;vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.5;min-height: 50px;padding: .75rem;" scope="row">'+ arg[i].message +'</td><td  class="mytd" style="vertical-align: middle;color: #43474A!important;font-size:17px;line-height: 1.15;width: 80px;text-align:center;" scope="row"></td></tr>';
      }
    }
  }
  if(arg != ""){
    messagesID = arg[i-1].ID
    resultlength = arg.length
  }
  document.getElementById("messages").innerHTML = table
  if(messagesent){
    document.getElementById("messageBox").value = ""
    document.getElementById("message-sending").style.display = "none"
    $("#messageBox").focus()
    out.scrollTop = out.scrollHeight - out.clientHeight;
  }
  if (checked == false){
    if(resultlength == 50){document.getElementById("loadMore").style.display = "block"}
    out.scrollTop = out.scrollHeight - out.clientHeight;
    messageload = setInterval(function() {
      ipcRenderer.send('messages-load', messageID, selecteduser);
    }, 10000);
    scrollOnMessageLoad = setInterval(function() {
      // allow 1px inaccuracy by adding 1
      var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
      if(isScrolledToBottom)
        out.scrollTop = out.scrollHeight - out.clientHeight;
    }, 1000);
    checked = true
  }
  if(jump == true){
    out.scrollTop = out.scrollHeight - out.clientHeight;
  }
  document.getElementById("messageBarContainer").style.display = "flex"
})

$("#messageBox").keypress(function(event) {
  if (event.keyCode === 13) {
    if (document.getElementById("messageBox").value !== ""){
      event.preventDefault();
      ipcRenderer.send("message-send",selecteduser,document.getElementById("messageBox").value,0,0);
      document.getElementById("message-sending").style.display = "block"
    }
   }
});

function loadMore(){
  if ((resultlength - 49) > 0){
    messageID = messagesID - 49
  } else {
    return document.getElementById("loadMore").style.display = "none"
  }
  ipcRenderer.send('messages-load', messageID, selecteduser, false, true);
  document.getElementById("jump").style.display = "block"
}

function jump(){
  messageID = 0
  document.getElementById("loadMore").style.display = "block"
  document.getElementById("jump").style.display = "none"
  ipcRenderer.send('messages-load', messageID, selecteduser, false, true);
}

var reader = new FileReader();

var openImage = function(event) {
  var input = event.target;
  var file = input.files[0]
  reader.readAsDataURL(file); // Runs reader which runs onload using the input file with index of 0
};
var MB

reader.onload = function(){
  // where n is the length of base64 encoded string
  var dataURL = reader.result;
  if(dataURL.length == 0){
    return ipcRenderer.send("file-not-found")
  }
  var bytes = (dataURL.length - 814) / 1.37
  MB = ''+(bytes / 1000000)+''
  if(MB > "10"){
    return ipcRenderer.send("too-large")
  }
  ipcRenderer.send("message-send",selecteduser,dataURL,0,1);
  document.getElementById("message-sending").style.display = "block"
};

// Stripe Client.js && Payments.js:
function addMembershipPayment(){
  tint()
  document.getElementById("Name").value = ""
  card.clear()
  card.mount("#card-element");
}

function handleForm(event) {
  event.preventDefault();
  // disable button
  $("#submit").prop("disabled", true);
  // add spinner to button
  $("#submit").html(
    `<span class="spinner-border spinner-border-sm" style="margin: 2.5px;" role="status" aria-hidden="true"></span>Loading...`
  );
  ipcRenderer.send("payMembership")
} 

let paymentID

ipcRenderer.on("client_secret", (event, clientSecret)=>{
  console.log(clientSecret)
  paymentID = clientSecret.split("_",2)
  paymentID = paymentID[0]+"_"+paymentID[1]
  
  stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
        name: document.getElementById("Name").value
      }
    }
  }).then(function(result) {
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      displayError.textContent = result.error.message;
      // enable button
      $("#submit").prop("disabled", false);
      // remove spinner to button
      $("#submit").html(
      `Pay`
    );
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        ipcRenderer.send("payment-success", paymentID)
        document.location.reload()
      }
    }
  });
})

var accountdata

ipcRenderer.on("payments-data",(event,arg,type)=>{
  if (arg.length == 0){
    $("#lastPaid").html(`Last paid: Never`)
    return $("#due").html(`You should pay for your first membership fee here or in person.<br>If you have already paid in person it may take a few days to show up here.`)
  }
  $("#lastPaid").html(`Last paid: `+moment(arg[0]["date"]).format('DD/MM/YYYY HH:mm'))
  var lastPaidPlusYear = moment(arg[0]["date"]).add(1,'year').format('YYYY-MM-DD HH:mm:ss')
  if(moment(lastPaidPlusYear).isSame(new Date(), 'month') && moment(lastPaidPlusYear).isSame(new Date(), 'year')){
    $("#due").html(`Membership payment due soon.<br>Due date: `+moment(lastPaidPlusYear).format('DD-MM-YYYY'))
  } else if (new Date() >= lastPaidPlusYear) {
    $("#due").html(`Membership payment overdue!<br>Due date: `+moment(lastPaidPlusYear).format('DD-MM-YYYY'))
  } else {
    $("#due").html(`Membership is in date.<br>Next payment due: `+moment(lastPaidPlusYear).format('DD/MM/YYYY'))
  }
})

$("#payments").click(function(){
  $("#payments .fa-chevron-right").toggleClass("rtoate90");
  $("#dropdown3").stop().slideToggle(300);
});

// Settings.js:

if (document.title === "Settings"){
  const version = document.getElementById('version');
    
  ipcRenderer.send('app_version');
};

ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version');
  version.innerText = 'Version ' + arg.version;
});

// Accounting.js:

function loadExpenditureFunc(){
  document.getElementById("table").innerHTML = '<a class="abs-center-x" style="padding: 8px;font-size: 25px;color: #818181!important;"><span class="spinner-border m-1" style="width: 1.25rem;height: 1.25rem;border-width: .2rem;" role="status" aria-hidden="true"></span>Loading...</a>'
  ipcRenderer.send("loadExpenditure")
}

var expenditureData

ipcRenderer.on("expenditure-data",(event,arg)=>{
  arg = JSON.parse(arg)
  expenditureData = arg
  var i=0
  var table =''; //to store html table
  for(i; i<arg.length; i++){
    var ID = "'" + arg[i].ID + "'"
    var item = "'" + arg[i].item + "'"
    var description = "'" + arg[i].description + "'"
    var datetime = "'" + moment(arg[i].datetime).format("DD/MM/YYYY HH:mm") + "'"
    var location = "'" + arg[i].location + "'"
    var member = "'" + arg[i].member + "'"
    table +='<tr><td class="mytd" style="vertical-align: middle;" scope="row">'+ arg[i].member +'</td><td class="mytd" style="vertical-align: middle;">'+ arg[i].item +'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].description+'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].datetime+'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].location+'</td><td class="mytd"><button type="button" class="btn btn-info" style="margin-right: 10px;" onclick="editExpenditureFunc('+ item +','+ description +','+ datetime +','+ location +','+ member +','+ ID +')" >&#9998; Edit</button><button type="submit" style="margin-right: 10px;" class="btn btn-danger" onclick="deleteExpenditure(' + ID + ')">&#9888; Delete Expenditure</button></td></tr>';
  }
  table ='<table class="table table-striped mytable"><thead><tr><th>Username</th><th>Item name</th><th>Description</th><th>Datetime</th><th>Location</th><th>Options</th></tr></thead><tbody>'+ table +'</tbody></table>';
  document.getElementById("table").innerHTML = table
  document.getElementById("SearchBox").style.display = "flex" 
})

if(document.title === "Accounting"){
  document.getElementById("SearchBoxInput").onkeyup = function(){
    var searchTerm = document.getElementById("SearchBoxInput").value
    if (searchTerm == "") {
      var arg = expenditureData
    } else {
      var arg = expenditureData.filter(data => data.item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }
    var i=0
    var table =''; //to store html table
    for(i; i<arg.length; i++){
      var ID = "'" + arg[i].ID + "'"
      var item = "'" + arg[i].item + "'"
      var description = "'" + arg[i].description + "'"
      var datetime = "'" + moment(arg[i].datetime).format("DD/MM/YYYY HH:mm") + "'"
      var location = "'" + arg[i].location + "'"
      var member = "'" + arg[i].member + "'"
      table +='<tr><td class="mytd" style="vertical-align: middle;" scope="row">'+ arg[i].member +'</td><td class="mytd" style="vertical-align: middle;">'+ arg[i].item +'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].description+'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].datetime+'</td><td class="mytd" style="vertical-align: middle;">'+arg[i].location+'</td><td class="mytd"><button type="button" class="btn btn-info" style="margin-right: 10px;" onclick="editExpenditureFunc('+ item +','+ description +','+ datetime +','+ location +','+ member +','+ ID +')" >&#9998; Edit</button><button type="submit" style="margin-right: 10px;" class="btn btn-danger" onclick="deleteExpenditure (' + ID + ')">&#9888; Delete Expenditure</button></td></tr>';
    }
    table ='<table class="table table-striped mytable"><thead><tr><th>Username</th><th>Item name</th><th>Description</th><th>Datetime</th><th>Location</th><th>Options</th></tr></thead><tbody>'+ table +'</tbody></table>';
    document.getElementById("table").innerHTML = table
  };
}

function editExpenditureFunc(item, description, datetime, location, member, ID) {
  $('#editExpenditureModal').modal('toggle');
  document.getElementById("itemEditExpend").value = item
  document.getElementById("descriptionEditExpend").value = description
  document.getElementById("datetimeEditExpend").value = datetime
  document.getElementById("locationEditExpend").value = location
  document.getElementById("memberEditExpend").value = member
  document.getElementById("expendID").value = ID
}

function editExpenditureConfirm(){
  var details = {
    item: document.getElementById("itemEditExpend").value,
    description: document.getElementById("descriptionEditExpend").value,
    datetime: moment(document.getElementById("datetimeEditExpend").value,"DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
    location: document.getElementById("locationEditExpend").value,
    member: document.getElementById("memberEditExpend").value,
    id: document.getElementById("expendID").value
  }
  ipcRenderer.send('edit-expend', details);
}

var deleteExpendID
  function deleteExpenditure(ID){
    deleteExpendID = ID
    $('#deleteExpendModal').modal('toggle');
    document.getElementById("confirmPassword").value = null
    document.getElementById("confirmPassword").focus()
  }

  function deleteExpendConfirm(){
    var details = {
      ID: deleteExpendID,
      password: document.getElementById('confirmPassword').value
  }
    ipcRenderer.send("delete-expend", details)
  }

ipcRenderer.on("expend-delete-incorrect", (event,arg) =>{
  document.getElementById('confirmPassword').value = null
  document.getElementById('confirmPassword').focus()
})

function loadPaymentsFunc(){
  
}

function addOutgoingFunc() {
  tint()
  document.getElementById("productInputOutgoing").value = ""
  document.getElementById("descriptionInputOutgoing").value = ""
  document.getElementById("datetimeInputOutgoing").value = ""
  document.getElementById("locationInputOutgoing").value = ""
}

function outgoingAdd() {
  var details = {
    item: document.getElementById("productInputOutgoing").value,
    description: document.getElementById("descriptionInputOutgoing").value,
    datetime: moment(document.getElementById("datetimeInputOutgoing").value,"DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
    location: document.getElementById("locationInputOutgoing").value
  }
  ipcRenderer.send('add-outgoing', details);
}

function addPaymentFunc() {
  tint()
  document.getElementById("datetimeInputPayment").value = ""
  document.getElementById("inPersonInput").selectedIndex = 0
  document.getElementById("membershipPaymentInput").selectedIndex = 0
  document.getElementById("paymentValueInput").value = ""
  document.getElementById("descriptionInputPayment").value = ""
  $("#paymentValueForm").show();
}

$("#membershipPaymentInput").change(function(){
  if($(this).val()=="Membership payment"){    
    $("#paymentValueForm").hide();
    $("#paymentValueInput").prop('required',false);
  } else {
    $("#paymentValueForm").show();
    $("#paymentValueInput").prop('required',true);
  }
});

ipcRenderer.on("load-usernames-data",(event,arg)=>{
  document.getElementById("buttons").style.display = "block"
  document.getElementById("table").innerHTML = ""
  var table ="<option value='' hidden>Select member:</option>"; //to store html table
  for (let i = 0; i < arg.length; i++) {
    table +='<option value="'+arg[i].username+'">'+arg[i].username+'</option>';
  }
  document.getElementById("membershipPaymentInputUsername").innerHTML = table
  document.getElementById("memberEditExpend").innerHTML = table
})

function paymentAdd() {
  if($("#inPersonInput").val() == "Yes"){
    var inPerson = 1
  } else {
    var inPerson = 0
  }
  if(document.getElementById("membershipPaymentInput").selectedIndex = 1){
    var details = {
      datetime: moment($("#datetimeInputPayment").val(),"DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
      inperson: inPerson,
      type: $('#membershipPaymentInput').val(),
      username: $("#membershipPaymentInputUsername").val(),
      value: "£13.00",
      description:$("#descriptionInputPayment").val()
    }
  } else {
    var details = {
      datetime: moment($("#datetimeInputPayment").val(),"DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
      inperson: inPerson,
      type: $('#membershipPaymentInput').val(),
      username: $("#membershipPaymentInputUsername").val(),
      value: $("#paymentValueInput").val(),
      description:$("#descriptionInputPayment").val()
    }
  }
  ipcRenderer.send("payment-add",details)
}

