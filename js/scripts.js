//buisness logic
function toDoItem(task, dueDate) {
  this.task = task;
  this.dueDate = dueDate;
  this.done = false;
}

toDoItem.prototype.isDone = function () {
  if (this.done === false) {
    this.done = true;
  } else {
    this.done = false;
  }

};


$(document).ready(function() {
  var undoneTally = 0;
  $("#undone-tally").text(undoneTally);
  $("form").submit(function(event) {
    undoneTally++;
    $("#undone-tally").text(undoneTally);
    event.preventDefault();
    var task = $("#new-task").val();
    var date = $("#new-due-date").val();

    var newToDoItem = new toDoItem(task, date);

    $("#output ul").append('<li class="task-output"><label><input type="checkbox"> ' + newToDoItem.task + "</label></li>" )

    $("#output form :checkbox").last().change(function() {
      console.log("test");
      newToDoItem.isDone();
      if (this.checked) {
        $(this).parent().addClass("done");
        console.log(newToDoItem.done);
      } else {
        $(this).parent().removeClass("done");
        console.log(newToDoItem.done);
      }
      undoneTally = 0;
      $("#output form :checkbox").each(function() {
        if (!this.checked) {
          undoneTally++;
        }
      })
      $("#undone-tally").text(undoneTally);
    });
  })
})
