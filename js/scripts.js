//buisness logic
var itemDates = [];
var toDoObjects = [];
var undoneTally = 0;

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

function checked(itemPair) {
  return !(itemPair[1].done);
}


$(document).ready(function() {

  $("#undone-tally").text(undoneTally);
  $("form").submit(function(event) {
    console.log(toDoObjects);
    undoneTally++;
    $("#undone-tally").text(undoneTally);
    event.preventDefault();
    var task = $("#new-task").val();
    var date = $("#new-due-date").val();

    var newObject = new toDoItem(task, date)
    toDoObjects.push([date, newObject]);
    toDoObjects.sort();
    console.log(toDoObjects);

    $("#output ul").text("");

    toDoObjects.forEach(function(task) {
      console.log(task, task[1]);
      $("#output ul").append('<li class="task-output"><label><input type="checkbox"> ' + task[1].task + "</label></li>" )

      $("#output form :checkbox").last().change(function() {
        console.log("test");
        task[1].isDone();
        if (this.checked) {
          $(this).parent().addClass("done");
          console.log(task[1].done);
        } else {
          $(this).parent().removeClass("done");
          console.log(task[1].done);
        }
        undoneTally = 0;
        $("#output form :checkbox").each(function() {
          if (!this.checked) {
            undoneTally++;
          }
        })
        $("#undone-tally").text(undoneTally);
      });

    });

  });
  $("#clear").click(function(){
    toDoObjects = toDoObjects.filter(checked);
    $("#output ul").text("");

    toDoObjects.forEach(function(task) {
      console.log(task, task[1]);
      $("#output ul").append('<li class="task-output"><label><input type="checkbox"> ' + task[1].task + "</label></li>" )

      $("#output form :checkbox").last().change(function() {
        console.log("test");
        task[1].isDone();
        if (this.checked) {
          $(this).parent().addClass("done");
          console.log(task[1].done);
        } else {
          $(this).parent().removeClass("done");
          console.log(task[1].done);
        }
        undoneTally = 0;
        $("#output form :checkbox").each(function() {
          if (!this.checked) {
            undoneTally++;
          }
        })
        $("#undone-tally").text(undoneTally);
      });
    });
  });
});
