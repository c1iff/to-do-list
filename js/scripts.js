//buisness logic
var itemDates = [];
var toDoObjects = [];
var undoneTally = 0;

function toDoItem(task, dueDate, details) {
  this.task = task;
  this.dueDate = dueDate;
  this.details = details;
  this.done = false;
}

toDoItem.prototype.isDone = function () {
  if (this.done === false) {
    this.done = true;
  } else {
    this.done = false;
  }
};

function checked(itemPair) {
  return !(itemPair[1].done);
}

function refreshList() {
  //clear to do list
  $("#output ul").text("");

  //loop through items in to do list, add to html list
  toDoObjects.forEach(function(task) {
    $("#output ul").append('<li class="task-output"><label><input type="checkbox"> </label> <span class="listItem">' + task[1].task + '</span><div class="detail-group"><h1 class="task-details"></h1><p class="date-details"></p><p class="details"></p></li>')

    //add checkbox listener to set done status(change object done boolean, add done class to list item)
    $("#output form :checkbox").last().change(function() {
      console.log("test");
      task[1].isDone();
      if (this.checked) {
        $(this).parent().parent().addClass("done");
      } else {
        $(this).parent().parent().removeClass("done");
      }

      //reset undone tally
      undoneTally = 0;

      //count each checked box
      $("#output form :checkbox").each(function() {
        if (!this.checked) {
          undoneTally++;
        }
      });

      //show number of undone items
      $("#undone-tally").text(undoneTally);
    });

    //add listener to show details when clicked
    $(".listItem").last().click(function() {
      console.log("test", task[1]);
      $(this).parent().children(".detail-group").slideToggle();
      $(".task-details").text(task[1].task);
      $(".date-details").text(task[1].dueDate);
      $(".details").text(task[1].details);
    })
  });
}

//User Interface
$(document).ready(function() {

  $("#undone-tally").text(undoneTally);
  $("form").submit(function(event) {
    undoneTally++;
    $("#undone-tally").text(undoneTally);
    event.preventDefault();
    var task = $("#new-task").val();
    var date = $("#new-due-date").val();
    var details = $("#new-details").val();

    var newObject = new toDoItem(task, date, details);
    toDoObjects.push([date, newObject]);
    toDoObjects.sort();

    refreshList();

    console.log(toDoObjects);
  });

  $("#clear").click(function(){
    toDoObjects = toDoObjects.filter(checked);
    $("#show-details").slideUp();
    refreshList();
  });
});
